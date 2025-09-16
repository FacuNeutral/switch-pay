import { Module } from '@nestjs/common';
import { UserSetUpService } from './user-set-up.service';
import { UserSetUpController } from './user-set-up.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@db/entities/user.entity';
import { MainDBModule } from '@db/main-db.module';

@Module({
  imports: [
    MainDBModule,
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UserSetUpService],
  providers: [UserSetUpService],
  controllers: [UserSetUpController],
})
export class UserSetUpModule { }