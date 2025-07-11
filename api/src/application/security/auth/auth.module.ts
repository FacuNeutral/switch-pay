import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import envs from 'src/_common/config/envs/env-var.plugin';
import { SecurityCode } from 'src/_common/database/entities/security-code.entity';
import { User } from 'src/_common/database/entities/user.entity';
import { createJwtService } from 'src/_common/providers/jwt.provider';
import { EmailSenderModule } from 'src/integrations/email/email-sender.module';
import { UsersModule } from '../../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SecurityCodeDao } from './dao/security-code.dao';
import { JwtStrategies } from './strategies/jwt.strategy';
import { DaoModule } from 'src/_common/database/dao/dao.module';

const {
  USER_ACCESS_TOKEN_EXPIRATION,
  USER_ACCESS_TOKEN_SECRET,
  USER_REFRESH_TOKEN_EXPIRATION,
  USER_REFRESH_TOKEN_SECRET,
} = envs;

@Module({
  imports: [
    UsersModule,
    DaoModule,
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