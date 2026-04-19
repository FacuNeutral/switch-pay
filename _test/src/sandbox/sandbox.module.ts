import { Module } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { SandboxController } from './sandbox.controller';
import { CacheModule } from 'src/_common/database/cache/cache.module';

@Module({
  imports: [
    CacheModule,
  ],
  providers: [SandboxService],
  controllers: [SandboxController]
})
export class SandboxModule { }
