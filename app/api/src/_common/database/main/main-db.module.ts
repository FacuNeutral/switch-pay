import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDao } from './dao/user.dao';
import { SecurityCodeDao } from './dao/security-code.dao';
import { SecurityCode, User } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SecurityCode]),
  ],
  providers: [UserDao, SecurityCodeDao],
  exports: [
    UserDao,
    SecurityCodeDao,
    TypeOrmModule.forFeature([User, SecurityCode])
  ],
})
export class MainDBModule { }
