import { Module } from '@nestjs/common';
import { BlacklistDao } from './dao/blacklist.dao';

@Module({
  providers: [BlacklistDao],
  exports: [BlacklistDao],
})
export class CacheModule { }
