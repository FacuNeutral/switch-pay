import { Module } from '@nestjs/common';
import { SessionSqlite } from './entities/session.sqlite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionDao } from './dao/session.dao';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionSqlite], 'sqlite'),
  ],
  providers: [SessionDao],
  exports: [
    SessionDao,
    TypeOrmModule.forFeature([SessionSqlite], 'sqlite'),
  ],
})
export class ColdStorageModule { }