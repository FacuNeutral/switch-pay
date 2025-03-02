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
@Module({
  imports: [

    //* Envs
    ConfigModule.forRoot(),

    //* Devtools
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 8000,
    }),

    //* TypeORM
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/_common/database/database.sqlite',
      // autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),

    //* App Modules
    ProductsModule,
    UsersModule,
    AccountsModule,
    TransactionsModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*path');
  }
}
