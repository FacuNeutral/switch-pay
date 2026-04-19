import { Module } from '@nestjs/common';
import { ColdStorageService } from './cold-storage.service';


@Module({
  providers: [ColdStorageService]
})
export class ColdStorageModule { }
