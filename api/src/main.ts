import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './_common/config/response-format/single-response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    
  });

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
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
