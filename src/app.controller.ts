import { Controller, Get, Render, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/utils/Error';

@Controller()
@UseFilters(HttpExceptionFilter)
export class AppController {
  @Get()
  @Render('index')
  homePage() {
    return { message: 'Hello world!' };
  }
}
