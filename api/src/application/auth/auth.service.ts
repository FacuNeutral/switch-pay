import { BadRequestException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/_common/database/entities/user.entity';
import { AutoLogErrors, SkipAutoLog } from 'src/_common/config/loggers/auto-log-errors.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { BasicCredentialsDto, LoginUserDto } from './dto/login-user.dto';

@Injectable()
@AutoLogErrors()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject('JWT_PRELOGIN')
    private readonly jwtPreLogin: JwtService,
  ) { }

  async createUser(body: CreateUserDto) {
    try {

      const newUser = this.userRepository.create(body);
      await this.userRepository.save(newUser);

      //* Remove sensitive properties
      const sanitizedUser = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profilePhoto: newUser.profilePhoto,
      }
      return sanitizedUser;
    } catch (error) { await this.handleException(error) }

  }

  async checkAndGetCredentials({ email, password }: BasicCredentialsDto) {

    const db_user = await this.userRepository.createQueryBuilder("user")
      .addSelect(["user.password", "user.pinCode"])
      .where("email = :email", { email })
      .getOne();
    console.log(db_user);
    if (!db_user) throw new UnauthorizedException("invalid credentials");

    const checkPassword = await bcrypt.compare(password, db_user.password);
    if (!checkPassword) throw new UnauthorizedException("invalid credentials");

    this.logger.log("checked credentials successfully");

    return db_user;
  }

  async loginUser(loginUser: LoginUserDto) {
    const db_user = await this.checkAndGetCredentials(loginUser);

    if (db_user.pinCode !== loginUser.pinCode)
      throw new UnauthorizedException("invalid credentials");

    const { password: removedPassword, pinCode: removedPinCode,
      ...result } = db_user;
    const token = this.jwtPreLogin.sign(result);
    this.logger.log("user logged in successfully", { ...result, token });
    return { ...result, token };
  }

  //% Errors management

  @SkipAutoLog()
  private async handleException(error: any) {
    if (error.code === "SQLITE_CONSTRAINT") {

      if (error.message.includes("UNIQUE constraint failed: user.email"))
        throw new BadRequestException("Email already exists");
    }
    // console.log("errorhjjhjh");
    //  throw error;
    // throw new InternalServerErrorException("Internal Server Error");

  }
}
