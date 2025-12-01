import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
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
import Logger from '@logger';
import { UserSessionsService } from "src/application/users/sessions/user-sessions.service";
@Injectable()
@AutoLogErrors()
export class AuthService {

  constructor(
    private readonly logger: Logger,
    private blacklistService: BlacklistService,
    @Inject("USER_REFRESH_TOKEN")
    private readonly refreshTokenService: JwtService,
    @Inject("USER_ACCESS_TOKEN")
    private readonly accessTokenService: JwtService,
    private readonly userSessionsService: UserSessionsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userDao: UserDao,
  ) { }

  async loginUser(basicCredentialsDto: BasicCredentialsDto, metadata = { ip: '127.0.0.1', device: 'TestDevice' }) {
    const db_user = await this.checkUserCredentials(basicCredentialsDto);
    const { password: removedPassword, pinCode: removedPinCode,
      ...result } = db_user;

    const userSession = await this.userSessionsService.create({
      userId: db_user.id, ...metadata
    });
    const token = this.refreshTokenService.sign({ sessionId: userSession.id, ...result });

    this.logger.log(`user logged in successfully`);

    return { ...result, token };
  }

  async logoutUser(userId: string, sessionId: string) {
    const db_user = await this.userDao.find(userId);

    await this.blacklistService.revokeToken(sessionId, "refreshToken");
    await this.userSessionsService.revoke(sessionId);

    this.logger.log(`user logged out successfully`);
  }

  async createUserSession(id: string, sessionId: string, pinCode: string,) {

    const userAuthenticated = await this.checkPinCode(id, pinCode);
    const {
      password: removedPassword, pinCode: removedPinCode,
      ...result
    } = userAuthenticated;
    const token = this.accessTokenService.sign({ ...result, sessionId });

    this.logger.log(`session started successfully`);

    return { ...result, token };
  }

  // async logoutUserSession(userId: string, sessionId: string) {
  //   const db_user = await this.userDao.find(userId);

  //   await this.blacklistService.revokeToken(sessionId, "accessToken");

  //   this.logger.log(`user "ID: ${db_user.id}" session ended successfully`);
  // }

  async obtainUserRegisterStep(userId: string): Promise<string> {
    const db_user = await this.userDao.find(userId);

    this.logger.verbose(`user register step obtained successfully`);

    return db_user.registerStep;
  }

  async test() {
    // throw new Error("test error");
    const metadata = { myName: "facu" };
     throw new NotFoundException("user not found");
    this.logger.log("checked credentials successfully", metadata);
  }

  private async checkUserCredentials({ email, password }: BasicCredentialsDto): Promise<User> {
    const db_user = await this.userRepository.createQueryBuilder("user")
      .addSelect(["user.password"])
      .where("email = :email", { email })
      .getOne();
    if (!db_user) throw new UnauthorizedException("invalid credentials");

    const checkPassword = await bcrypt.compare(password, db_user.password);
    if (!checkPassword) throw new UnauthorizedException("invalid credentials");

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

    this.logger.verbose("pincode validated successfully");

    return db_user;
  }

}
