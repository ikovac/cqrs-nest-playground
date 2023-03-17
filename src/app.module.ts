import { Module } from '@nestjs/common';
import { BlogModule } from './modules/blog/blog.module';
import { DatabaseModule } from 'database.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from 'shared/global-exception.filter';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        redact: ['req.headers.Authorization', 'req.headers.authorization'],
        level: 'debug',
        quietReqLogger: true,
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
        formatters: {
          level: (level) => ({ level }),
        },
      },
    }),
    DatabaseModule.forRoot(),
    BlogModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
