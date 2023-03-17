import { Module, DynamicModule } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LoadStrategy } from '@mikro-orm/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'config/database';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { PinoLogger } from 'nestjs-pino';

@Module({
  imports: [ConfigModule.forRoot({ load: [databaseConfig] })],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    const mikroOrmModule = MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, PinoLogger],
      useFactory: (config: ConfigService, logger: PinoLogger) => ({
        loadStrategy: LoadStrategy.JOINED,
        ...config.get('database'),
        highlighter: new SqlHighlighter(),
        logger: (msg) => logger.debug(msg),
        autoLoadEntities: true,
      }),
    });
    return {
      module: DatabaseModule,
      imports: [mikroOrmModule],
    };
  }

  static forUnitTest(entities = []): DynamicModule {
    const mikroOrmModule = MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        loadStrategy: LoadStrategy.JOINED,
        ...config.get('database'),
        entities,
        connect: false,
        debug: false,
      }),
    });
    return {
      module: DatabaseModule,
      imports: [mikroOrmModule],
    };
  }

  static forIntegrationTest(): DynamicModule {
    const mikroOrmModule = MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        loadStrategy: LoadStrategy.JOINED,
        ...config.get('database'),
        autoLoadEntities: true,
        allowGlobalContext: true,
      }),
    });
    return {
      module: DatabaseModule,
      imports: [mikroOrmModule],
    };
  }
}
