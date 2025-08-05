import { Module } from '@nestjs/common';
import { BlacklistCacheRepository } from './repositories/blacklist-cache.repository';

@Module({
  providers: [BlacklistCacheRepository],
  exports: [BlacklistCacheRepository],
})
export class CacheModule { }
