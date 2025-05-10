import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/_common/database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { BasicCredentialDto, LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { first } from 'rxjs';
@Injectable()
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
    } catch (error) { this.handleException(error) }

  }

  async checkCredential({ email, password }: BasicCredentialDto) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new BadRequestException("your email is invalid");

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new UnauthorizedException("your password is invalid");

    this.logger.error("Invalid credentials");

  }

  async loginUser(body: LoginUserDto) {
    const user = await this.userRepository.findOneBy({ email: body.email });
    if (!user) throw new BadRequestException("your email is invalid");

    const checkPassword = await bcrypt.compare(body.password, user.password);
    if (!checkPassword) throw new UnauthorizedException("your password is invalid");

    // const checkPinCode = 

    this.logger.error("Invalid credentials");

    const { password: removedPassword, ...result } = user;
    const token = this.jwtPreLogin.sign(result);

    return { ...result, token };
  }


  //% Errors management
  private handleException(error: any) {

    this.logger.error(error.message);

    if (error.code === "SQLITE_CONSTRAINT") {

      if (error.message.includes("UNIQUE constraint failed: user.email"))
        throw new BadRequestException("Email already exists");
    }

    throw new InternalServerErrorException("Internal Server Error");

  }
}
