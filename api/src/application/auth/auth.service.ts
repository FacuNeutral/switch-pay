import { BadRequestException, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { type Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { hash } from 'bcrypt';
import { User } from "src/_common/database/entities/user.entity";
import { AutoLogErrors, SkipAutoLog } from "src/_common/config/loggers/auto-log-errors.decorator";
import { BasicCredentialsDto, CreateUserDto } from "./dto/user-auth.dto";
import { UserDao } from "../users/dao/user.dao";
import { EmailSenderService } from "src/integrations/email/email-sender.service";
import { SecurityCodeDao } from "./dao/security-code.dao";
import { RecoveryUserData, UserAction } from "src/_common/database/interfaces/user-action.interface";
import { parseMinutesToMs, parseTimeMinutesToMs } from "./helpers/parse-time-to-ms";
import envs from "src/_common/config/envs/env-var.plugin";

@Injectable()
@AutoLogErrors()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userDao: UserDao,
    private readonly securityCodeDao: SecurityCodeDao,
    private emailSender: EmailSenderService,
    @Inject("USER_REFRESH_TOKEN")
    private readonly refreshTokenService: JwtService,
    @Inject("USER_ACCESS_TOKEN")
    private readonly accessTokenService: JwtService,
    @Inject("USER_RECOVERY_TOKEN")
    private readonly recoveryTokenService: JwtService,
  ) { }

  async loginUser(basicCredentialsDto: BasicCredentialsDto) {
    const db_user = await this.checkUserCredentials(basicCredentialsDto);
    const { password: removedPassword, pinCode: removedPinCode,
      ...result } = db_user;
    const token = this.refreshTokenService.sign(result);

    this.logger.log(`user "ID: ${db_user.id}" logged in successfully`);

    return { ...result, token };
  }

  async createUserSession(id: string, pinCode: string) {

    const userAuthenticated = await this.checkPinCode(id, pinCode);
    const { password: removedPassword, pinCode: removedPinCode,
      ...result } = userAuthenticated;
    const token = this.accessTokenService.sign(result);

    this.logger.log(`user "ID: ${userAuthenticated.id}" session started successfully`);

    return { ...result, token };
  }

  async obtainUserRegisterStep(id: string): Promise<string> {
    const db_user = await this.userDao.getUserById(id);

    this.logger.log(`user "ID: ${db_user.id}" register step obtained`);

    return db_user.registerStep;
  }

  async recoverUserPassword(userEmail: string): Promise<void> {
    const db_user = await this.userDao.getUserByEmail(userEmail);
    const { code } = await this.securityCodeDao.createByUserId(db_user.id, UserAction.ResetPassword);

    await this.emailSender.sendCodeToResetPassword(db_user.email, db_user.firstName, db_user.lastName, code);
  };

  async obtainTokenForResetPassword(userEmail: string, code: string): Promise<string> {
    const db_user = await this.userDao.getUserByEmail(userEmail);
    const db_security_code = await this.securityCodeDao.getByUserId(db_user.id, UserAction.ResetPassword);
    if (!db_security_code)
      throw new NotFoundException("security code not found for this user");

    const checkExpiration: boolean = new Date().getTime() - db_security_code.updatedAt.getTime() > parseTimeMinutesToMs(envs.USER_RECOVERY_TOKEN_EXPIRATION);
    if (checkExpiration)
      throw new BadRequestException("your code has expired, please request a new one");

    const checkCode = await bcrypt.compare(code, db_security_code.code);
    if (!checkCode) throw new UnauthorizedException("your code is invalid");

    const token = this.recoveryTokenService.sign({
      id: db_user.id,
      codeId: db_security_code.id,
      userAction: UserAction.ResetPassword,
    });
    this.logger.log(`token for user "ID: ${db_user.id}" to reset password created successfully`);

    return token;
  }

  async resetUserPassword(user: RecoveryUserData, newPassword: string): Promise<void> {

    const db_security_code = await this.securityCodeDao.getByUserId(user.id, user.userAction);
    if (db_security_code.id !== user.codeId)
      throw new UnauthorizedException("invalid security code");

    const password = await bcrypt.hash(newPassword, 10);
    await this.userDao.update(user.id, { password }).save();

    await this.securityCodeDao.deleteById(db_security_code.id);

    this.logger.log(`user "ID: ${user.id}" password reset successfully`);
  }


  async recoverUserPinCode(userEmail: string): Promise<void> {
    const db_user = await this.userDao.getUserByEmail(userEmail);
    const { code } = await this.securityCodeDao.createByUserId(db_user.id, UserAction.ResetPincode);

    await this.emailSender.sendCodeToResetPincode(db_user.email, db_user.firstName, db_user.lastName, code);
  };

  private async checkUserCredentials({ email, password }: BasicCredentialsDto): Promise<User> {
    const db_user = await this.userRepository.createQueryBuilder("user")
      .addSelect(["user.password"])
      .where("email = :email", { email })
      .getOne();
    if (!db_user) throw new UnauthorizedException("invalid credentials");

    const checkPassword = await bcrypt.compare(password, db_user.password);
    if (!checkPassword) throw new UnauthorizedException("invalid credentials");

    this.logger.log("checked credentials successfully");

    return db_user;
  }

  private async checkPinCode(id: string, pinCode: string): Promise<User> {
    const db_user = await this.userRepository.createQueryBuilder("user")
      .addSelect(["user.password", "user.pinCode"])
      .where("id = :id", { id })
      .getOne();

    if (!db_user) throw new UnauthorizedException("user not found");
    if (!db_user.pinCode) throw new BadRequestException("user does not have a pin code");

    const checkPinCode = await bcrypt.compare(pinCode, db_user.pinCode);
    if (!checkPinCode) throw new UnauthorizedException("your pincode is invalid");

    this.logger.log("pincode validated successfully");

    return db_user;
  }

}
