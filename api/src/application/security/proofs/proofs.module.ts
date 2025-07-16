import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import envs from '@envs';
import { createJwtService } from 'src/_common/providers/jwt.provider';
import { EmailSenderModule } from 'src/integrations/email/email-sender.module';
import { MainDBModule } from '../../../_common/database/main/main-db.module';
import { ProofsController } from './proofs.controller';
import { ProofsService } from './proofs.service';

const {
  USER_RECOVERY_TOKEN_EXPIRATION,
  USER_RECOVERY_TOKEN_SECRET,
} = envs;

@Module({
  imports: [
    MainDBModule,
    EmailSenderModule,
    JwtModule,
  ],
  controllers: [ProofsController],
  providers: [
    ProofsService,
    createJwtService(
      "USER_RECOVERY_TOKEN",
      USER_RECOVERY_TOKEN_SECRET,
      USER_RECOVERY_TOKEN_EXPIRATION,
    ),
  ],
})
export class ProofsModule { }
