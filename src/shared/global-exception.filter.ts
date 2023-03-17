import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error({
      msg: exception.message,
      err: exception,
    });
    if (host.getType() !== 'http') return;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (!(exception instanceof HttpException)) {
      return response.status(500).json({
        statusCode: 500,
        message: 'Something went wrong.',
        path: request.url,
      });
    }

    const status = exception.getStatus();
    return response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
    });
  }
}
