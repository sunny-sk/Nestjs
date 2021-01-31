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
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
@ApiTags('tasks')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  async create(
    @Body('title') title: string,
    @Body('description') description: string
  ) {
    return await this.taskService.addTask(title, description);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.taskService.getOne(id);
  }

  @Get()
  async getAll() {
    return this.taskService.getAll();
  }
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: Task) {
    return this.taskService.updateTask(id, body);
  }
}
