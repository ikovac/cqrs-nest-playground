import { DynamicModule, Global, Module, Scope } from '@nestjs/common';
import {
  WinstonLogger,
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from 'nest-winston';
import { createLogger, Logger, LoggerOptions } from 'winston';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: LoggerOptions): DynamicModule {
    const providers = [
      {
        provide: WINSTON_MODULE_PROVIDER,
        useFactory: () => createLogger(options),
      },
      {
        provide: WINSTON_MODULE_NEST_PROVIDER,
        useFactory: (logger: Logger) => {
          return new WinstonLogger(logger);
        },
        scope: Scope.TRANSIENT,
        inject: [WINSTON_MODULE_PROVIDER],
      },
    ];
    return {
      module: LoggerModule,
      providers,
      exports: providers,
    };
  }
}
