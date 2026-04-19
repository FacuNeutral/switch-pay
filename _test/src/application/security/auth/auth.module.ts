import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { createJwtService } from 'src/_common/providers/jwt.provider';
import { UsersModule } from '@users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategies } from './strategies/jwt.strategy';
import { MainDBModule } from '@db/main-db.module';
import { User } from '@db/entities/user.entity';
import envs from '@config/envs/env-var.plugin';


const {
  USER_ACCESS_TOKEN_EXPIRATION,
  USER_ACCESS_TOKEN_SECRET,
  USER_REFRESH_TOKEN_EXPIRATION,
  USER_REFRESH_TOKEN_SECRET,
} = envs;

@Module({
  imports: [
    UsersModule,
    MainDBModule,
    TypeOrmModule.forFeature([User]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
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
  exports: [
    AuthService,
  ]
})
export class AuthModule { }