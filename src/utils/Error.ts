import { HttpException, HttpStatus } from '@nestjs/common';

export class Error extends HttpException {
  constructor(success: boolean, message: string, status: HttpStatus) {
    super({ time: new Date().toISOString(), success, message, status }, status);
  }
}
