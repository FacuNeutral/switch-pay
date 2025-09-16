import { Module } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { SandboxController } from './sandbox.controller';
import { CacheModule } from 'src/_common/database/cache/cache.module';
import { UserSessionsModule } from 'src/application/users/sessions/user-sessions.module';

@Module({
  imports: [
    CacheModule,
    UserSessionsModule
  ],
  providers: [SandboxService],
  controllers: [SandboxController]
})
export class SandboxModule {

}
