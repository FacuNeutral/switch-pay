import { Module } from '@nestjs/common';
import { UserManagerService } from './user-manager.service';
import { MainDBModule } from '@db/main-db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@db/entities';

@Module({
  imports: [
    MainDBModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserManagerService],
  controllers: [],
  exports: [UserManagerService],
})
export class UserManagerModule { }
