import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MorganMiddleware } from './_common/middlewares/morgan.middleware';
import { UsersModule } from './application/users/users.module';
import { AccountsModule } from './application/bank/accounts/accounts.module';
import { TransactionsModule } from './application/bank/transactions/transactions.module';
import { AuthModule } from './application/security/auth/auth.module';
import { SessionSerializer } from './application/security/auth/session.serializer';
import { ProofsModule } from './application/security/proofs/proofs.module';
import envs from './_common/config/envs/env-var.plugin';
import { DaoModule } from './_common/database/dao/dao.module';
import { RecoveryModule } from './application/security/recovery/recovery.module';
import { RecoveryController } from './application/security/recovery/recovery.controller';
import { RecoveryService } from './application/security/recovery/recovery.service';

@Module({
  imports: [

    //* Envs
    ConfigModule.forRoot(),

    //* Devtools
    DevtoolsModule.register({
      http: envs.DEV_MODE,
      port: 8000,
    }),

    //* TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: envs.DEV_MODE,
      //  dropSchema: true,
    }),

    //* App Modules
    // ProductsModule,
    DaoModule,
    UsersModule,
    RecoveryModule,
    // AccountsModule,
    // TransactionsModule,
    AuthModule,
    ProofsModule,
    RecoveryModule,
  ],
  providers: [SessionSerializer, RecoveryService],
  controllers: [RecoveryController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*path');
  }
}