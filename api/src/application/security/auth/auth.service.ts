import { BadRequestException, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { type Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { hash } from 'bcrypt';
import { AutoLogErrors, SkipAutoLog } from "src/_common/config/loggers/auto-log-errors.decorator";
import { BasicCredentialsDto, CreateUserDto } from "./dtos/user-auth.dto";
import { EmailSenderService } from "src/integrations/email/email-sender.service";

import { parseMinutesToMs, parseTimeMinutesToMs } from "../../../_common/utils/calcs/parse-time";
import { UserDao } from "@db/dao/user.dao";
import { User } from "@db/entities";
import { v4 as uuidv4 } from 'uuid';
import { BlacklistService } from "src/shared/blacklist/blacklist.service";
@Injectable()
@AutoLogErrors()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    private blacklistService: BlacklistService,
    @Inject("USER_REFRESH_TOKEN")
    private readonly refreshTokenService: JwtService,
    @Inject("USER_ACCESS_TOKEN")
    private readonly accessTokenService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userDao: UserDao,
  ) { }

  async loginUser(basicCredentialsDto: BasicCredentialsDto) {
    const db_user = await this.checkUserCredentials(basicCredentialsDto);
    const { password: removedPassword, pinCode: removedPinCode,
      ...result } = db_user;

    const tokenId = uuidv4();
    const token = this.refreshTokenService.sign({ tokenId, ...result });

    this.logger.log(`user "ID: ${db_user.id}" logged in successfully`);

    return { ...result, token };
  }

  async logoutUser(userId: string, tokenId: string) {
    const db_user = await this.userDao.find(userId);

    await this.blacklistService.revokeToken(tokenId, "refreshToken");

    this.logger.log(`user "ID: ${db_user.id}" logged out successfully`);
  }

  async createUserSession(id: string, pinCode: string, refreshTokenId: string) {

    const userAuthenticated = await this.checkPinCode(id, pinCode);
    const { password: removedPassword, pinCode: removedPinCode,
      ...result } = userAuthenticated;
    const token = this.accessTokenService.sign({ ...result, tokenId: refreshTokenId });

    this.logger.log(`user "ID: ${userAuthenticated.id}" session started successfully`);

    return { ...result, token };
  }

  async logoutUserSession(userId: string, tokenId: string) {
    const db_user = await this.userDao.find(userId);

    await this.blacklistService.revokeToken(tokenId, "accessToken");

    this.logger.log(`user "ID: ${db_user.id}" session ended successfully`);
  }

  async obtainUserRegisterStep(userId: string): Promise<string> {
    const db_user = await this.userDao.find(userId);

    this.logger.log(`user "ID: ${db_user.id}" register step obtained`);

    return db_user.registerStep;
  }

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
