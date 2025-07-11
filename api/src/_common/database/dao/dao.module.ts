import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/_common/database/entities/user.entity';
import { UserDao } from './user.dao';
import { SecurityCode } from 'src/_common/database/entities/security-code.entity';
import { SecurityCodeDao } from './security-code.dao';

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
export class DaoModule { }
