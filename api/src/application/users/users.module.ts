import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/_common/database/entities/user.entity';
import { UserDao } from './dao/user.dao';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UsersService, UserDao],
  providers: [UsersService, UserDao],
  controllers: [UsersController],
})
export class UsersModule { }