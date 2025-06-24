import { BadRequestException, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { type Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

import { User } from "src/_common/database/entities/user.entity";
import { AutoLogErrors, SkipAutoLog } from "src/_common/config/loggers/auto-log-errors.decorator";
import { BasicCredentialsDto, CreateUserDto } from "./dto/user-auth.dto";
import { UserDao } from "../users/dao/user.dao";

@Injectable()
@AutoLogErrors()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userDao: UserDao,
    @Inject("USER_REFRESH_TOKEN")
    private readonly refreshTokenService: JwtService,
    @Inject("USER_ACCESS_TOKEN")
    private readonly accessTokenService: JwtService,
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

    if (!db_user) throw new UnauthorizedException("invalid credentials");

    if (db_user.pinCode !== pinCode)
      throw new BadRequestException("pincode is invalid");

    this.logger.log("pincode validated successfully");

    return db_user;
  }

}
