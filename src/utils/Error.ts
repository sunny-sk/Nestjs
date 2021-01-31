import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
export class Error extends HttpException {
  constructor(success: boolean, message: string, status: HttpStatus) {
    super({ success, message, status }, status);
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const thrownError = exception.getResponse() as {
      success: boolean;
      message: string;
      status: number;
    };
    response.status(status).json({
      statusCode: status,
      message: thrownError.message,
      success: thrownError.success,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
