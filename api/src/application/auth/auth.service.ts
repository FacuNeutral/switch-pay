import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/_common/database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }


  async createUser(body: CreateUserDto) {
    try {

      const newUser = this.userRepository.create(body);
      await this.userRepository.save(newUser);

    } catch (error) { this.handleException(error) }

  }

  async loginUser(body: LoginUserDto) {
    const user = await this.userRepository.findOneBy({ email: body.email });

    if (user && await bcrypt.compare(body.password, user.password)) {
      const { password, ...result } = user;
      const token = this.jwtService.sign(result);
      return { ...result, token };
    }
    this.logger.error("Invalid credentials");
    throw new BadRequestException("Invalid credentials");
  }

  //% Errors management
  private handleException(error: any) {

    // this.logger.error(error.message);

    if (error.code === "SQLITE_CONSTRAINT") {

      if (error.message.includes("UNIQUE constraint failed: user.email"))
        throw new BadRequestException("Email already exists");
    }

    throw new InternalServerErrorException("Internal Server Error");

  }
}
