import { Module } from '@nestjs/common';
import { MainDBModule } from '@db/main-db.module';
import { RecoveryController } from './recoveries.controller';
import { RecoveryService } from './recoveries.service';

@Module({
    imports: [
        MainDBModule,
    ],
    controllers: [RecoveryController],
    providers: [RecoveryService],
})
export class RecoveryModule { }
