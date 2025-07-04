import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ProductsModule } from './application/products/products.module';
import { MorganMiddleware } from './_common/middlewares/morgan.middleware';
import { UsersModule } from './application/users/users.module';
import { AccountsModule } from './application/accounts/accounts.module';
import { TransactionsModule } from './application/transactions/transactions.module';
import { AuthModule } from './application/auth/auth.module';
import { SessionSerializer } from './application/auth/session.serializer';
import envs from './_common/config/envs/env-var.plugin';

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
    ProductsModule,
    UsersModule,
    AccountsModule,
    TransactionsModule,
    AuthModule,

  ],
  providers: [SessionSerializer],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*path');
  }
}