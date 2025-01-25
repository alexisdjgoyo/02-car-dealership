import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //solo deja la data validada
      forbidNonWhitelisted: true, //si esta y la anterior son true solo permite la data que se espera
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
