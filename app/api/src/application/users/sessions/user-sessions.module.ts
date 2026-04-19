import { Module, OnModuleInit } from '@nestjs/common';
import { UserSessionsService } from './user-sessions.service';
import { UserSessionsController } from './user-sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSqlite } from 'src/_common/database/cold-storage/entities/session.sqlite.entity';
import { ColdStorageModule } from 'src/_common/database/cold-storage/cold-storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionSqlite], 'sqlite'),
    ColdStorageModule
  ],
  providers: [UserSessionsService],
  controllers: [UserSessionsController],
  exports: [UserSessionsService]
})
export class UserSessionsModule {

}
