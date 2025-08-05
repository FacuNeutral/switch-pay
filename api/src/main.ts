import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './_common/config/response-format/single-response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,

  });


  //% Passport Session
  // app.use(
  //   session({
  //     name: 'mi_sesion',
  //     secret: 'mi_clave_secreta',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24, // 1 día
  //     },
  //   }),
  // );

  // app.use(passport.initialize());
  // app.use(passport.session());
  app.use(cookieParser());

  //% Global Interceptors
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  //% Base route
  app.setGlobalPrefix('api');

  //% Log visibility
  app.useLogger([
    'log',
    'warn',
    'debug',
    'verbose',
    "fatal",
    "error"
  ]);

  //% Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );


  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();