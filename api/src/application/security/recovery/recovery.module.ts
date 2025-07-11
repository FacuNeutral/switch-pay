import { Module } from '@nestjs/common';
import { DaoModule } from 'src/_common/database/dao/dao.module';
import { RecoveryController } from './recovery.controller';
import { RecoveryService } from './recovery.service';

@Module({
    imports: [
        DaoModule,
    ],
    controllers: [RecoveryController],
    providers: [RecoveryService],
})
export class RecoveryModule { }
