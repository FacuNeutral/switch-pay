import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule as CacheManagerModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevtoolsModule } from '@nestjs/devtools-integration';

import envs from '@envs';
import { MainDBModule } from '@db/main-db.module';
import { MorganMiddleware } from '@middlewares/morgan.middleware';

import { AuthModule } from '@auth/auth.module';
import { SessionSerializer } from '@auth/session.serializer';
import { ProofsModule } from '@proofs/proofs.module';
import { RecoveryModule } from '@recoveries/recoveries.module';
import { RecoveryController } from '@recoveries/recoveries.controller';
import { RecoveryService } from '@recoveries/recoveries.service';
import { ColdStorageModule } from './_common/database/cold-storage/cold-storage.module';
import { CacheModule } from './_common/database/cache/cache.module';
import { SandboxModule } from './_sandbox/sandbox.module';
import { BlacklistModule } from './shared/blacklist/blacklist.module';
import { UserManagerModule } from './shared/user-manager/user-manager.module';
import { UserSessionsModule } from './application/users/sessions/user-sessions.module';
import { UserSetUpModule } from '@users/user-set-up.module';
import { RequestContextMiddleware } from '@middlewares/request-context.middleware';
import { LoggerModule } from '@config/winston/logger.module';


@Module({
  imports: [

    //% Envs
    ConfigModule.forRoot(),

    //% Devtools
    DevtoolsModule.register({
      http: envs.DEV_MODE,
      port: 8000,
    }),

    //% Postgresql (TypeORM)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME,
      entities: [__dirname + '/_common/database/main/entities/*{.ts,.js}'],
      synchronize: envs.DEV_MODE,
      //  dropSchema: true,
    }),

    //% SQLite (TypeORM)
    TypeOrmModule.forRoot({
      name: 'sqlite',
      type: 'sqlite',
      database: './src/_common/database/cold-storage/database.sqlite',
      entities: [__dirname + '/**/*.sqlite.entity{.ts,.js}'],
      synchronize: true,
    }),

    //% Memory Cache
    CacheManagerModule.register({
      ttl: 3600,
      max: 1000,
      isGlobal: true,
    }),

    //% App Modules Picks
    // ProductsModule,
    LoggerModule,
    MainDBModule,
    RecoveryModule,
    // AccountsModule,
    // TransactionsModule,
    AuthModule,
    ProofsModule,
    RecoveryModule,
    ColdStorageModule,
    CacheModule,
    SandboxModule,
    BlacklistModule,
    UserManagerModule,
    UserSessionsModule,
    UserSetUpModule,
    
  ],
  providers: [SessionSerializer, RecoveryService],
  controllers: [RecoveryController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*path');
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}