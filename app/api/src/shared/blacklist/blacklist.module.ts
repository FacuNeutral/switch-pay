import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { CacheModule } from '@cache/cache.module';

@Module({
  imports: [CacheModule],
  controllers: [],
  providers: [BlacklistService],
  exports: [BlacklistService],
})
export class BlacklistModule { }
