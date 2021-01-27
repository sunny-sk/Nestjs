import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task.model';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Error } from 'src/utils/Error';
import { TaskRepository } from './task.Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}

  getTasks(filterData: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterData);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new Error(
        false,
        `task not found with this ${id} id`,
        HttpStatus.NOT_FOUND
      );
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<any> {
    const { affected } = await this.taskRepository.delete(id);
    if (!affected) {
      throw new Error(
        false,
        `task not found with this ${id} id`,
        HttpStatus.NOT_FOUND
      );
    }
    return {
      status: 200,
      success: true,
      message: 'Task deleted successfully',
    };
  }
  async updateTaskStatus(id: number, newStatus: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = newStatus;
    await task.save();
    return task;
  }
}
