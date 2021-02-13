/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/Error';
import { Test } from './tests.model';
import { TestsService } from './tests.service';

@Controller('test')
@ApiTags('tests')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard('jwt'))
export class TestController {
  constructor(private readonly testService: TestsService) {}

  @Post()
  async create() {
    //
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    //
  }

  @Get()
  async getAll() {
    //
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    //
  }

  @Patch(':id')
  updateTask(@Param('id') id: string) {
    //
  }
}
