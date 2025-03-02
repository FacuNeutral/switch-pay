import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

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
