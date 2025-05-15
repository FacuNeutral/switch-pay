import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from 'src/_common/database/entities/user.entity';
import envs from 'src/_common/config/envs/env-var.plugin';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: envs.USER_TOKEN_SECRET,
      signOptions: { expiresIn: envs.USER_TOKEN_EXPIRATION },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    LocalStrategy, 
    // {
    //   provide: 'USER_TOKEN',
    //   useFactory: () => {
    //     return new JwtService({
    //       secret: envs.USER_TOKEN_SECRET,
    //       signOptions: {
    //         expiresIn: envs.USER_TOKEN_EXPIRATION,
    //       },
    //     });
    //   },
    // },
  ],
})
export class AuthModule { }