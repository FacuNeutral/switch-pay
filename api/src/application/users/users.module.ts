import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@db/entities/user.entity';
import { MainDBModule } from '@db/main-db.module';

@Module({
  imports: [
    MainDBModule,
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }