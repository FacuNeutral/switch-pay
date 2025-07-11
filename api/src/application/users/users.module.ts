import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/_common/database/entities/user.entity';
import { DaoModule } from '../../_common/database/dao/dao.module';

@Module({
  imports: [
    DaoModule,
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }