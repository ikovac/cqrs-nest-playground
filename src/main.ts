import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

process.on('unhandledRejection', (err) => {
  throw err;
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(Logger);

  process.on('uncaughtException', (err) => {
    if (logger) {
      logger.error(err);
    }
    process.exit(1);
  });

  app.useLogger(logger);

  await app.listen(3000);
}

bootstrap();
