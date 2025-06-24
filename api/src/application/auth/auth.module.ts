import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from 'src/_common/database/entities/user.entity';
import envs from 'src/_common/config/envs/env-var.plugin';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { createJwtService } from 'src/_common/providers/jwt.provider';
import { JwtStrategies } from './strategy/jwt.strategy';
import { UsersModule } from '../users/users.module';


const {
  USER_ACCESS_TOKEN_EXPIRATION,
  USER_ACCESS_TOKEN_SECRET,
  USER_REFRESH_TOKEN_EXPIRATION,
  USER_REFRESH_TOKEN_SECRET
} = envs;

@Module({
  imports: [
    // PassportModule.register({ session: true }),
    // JwtModule.register({
    //   secret: USER_REFRESH_TOKEN_SECRET,
    //   signOptions: { expiresIn: '60d' }, // 60 days
    // }),
    UsersModule,
    TypeOrmModule.forFeature([User]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,
    // LocalStrategy,
    ...JwtStrategies,
    createJwtService(
      "USER_ACCESS_TOKEN",
      USER_ACCESS_TOKEN_SECRET,
      USER_ACCESS_TOKEN_EXPIRATION,
    ),
    createJwtService(
      "USER_REFRESH_TOKEN",
      USER_REFRESH_TOKEN_SECRET,
      USER_REFRESH_TOKEN_EXPIRATION,
    ),
  ],
})
export class AuthModule { }