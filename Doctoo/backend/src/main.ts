import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Doctoo API')
    .setDescription('The Doctoo API description')
    .setVersion('1.0')
    .build();
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  if (process.env.NODE_ENV === 'development') {
    app.use(express.static('/app/src/filesystem/local-uploads/'));
  }
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.BACKEND_PORT);
}
bootstrap();
