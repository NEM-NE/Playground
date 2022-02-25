import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port } = config.get('server');
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
