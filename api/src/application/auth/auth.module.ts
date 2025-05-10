import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from 'src/_common/database/entities/user.entity';
import envs from 'src/_common/config/envs/env-var.plugin';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret:envs.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: envs.JWT_ACCESS_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: 'JWT_PRELOGIN',
      useFactory: () => {
        return new JwtService({
          secret: process.env.JWT_PRELOGIN_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_PRELOGIN_EXPIRES_IN,
          },
        });
      },
    },
  ],
})
export class AuthModule { }

console.log(envs.JWT_ACCESS_EXPIRES_IN);