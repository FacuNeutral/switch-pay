import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from 'src/_common/database/entities/user.entity';
import envs from 'src/_common/config/envs/env-var.plugin';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { createJwtService } from 'src/_common/providers/jwt.provider';
import { JwtStrategies } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { EmailSenderService } from 'src/integrations/email/email-sender.service';
import { EmailSenderModule } from 'src/integrations/email/email-sender.module';
import { SecurityCode } from 'src/_common/database/entities/security-code.entity';
import { SecurityCodeDao } from './dao/security-code.dao';

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
    EmailSenderModule,
    UsersModule,
    TypeOrmModule.forFeature([User, SecurityCode]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SecurityCodeDao,
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
  exports: [
    AuthService,
    SecurityCodeDao,
  ]
})
export class AuthModule { }