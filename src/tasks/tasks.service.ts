import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task.model';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Error } from 'src/utils/Error';
import { TaskRepository } from './task.Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}

  getTasks(filterData: GetTaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterData, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!task) {
      throw new Error(
        false,
        `task not found with this ${id} id`,
        HttpStatus.NOT_FOUND
      );
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: number, user: User): Promise<any> {
    const result = await this.taskRepository.delete({
      id: +id,
      userId: user.id,
    });
    if (!result.affected) {
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

  async updateTaskStatus(
    id: number,
    newStatus: TaskStatus,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = newStatus;
    await task.save();
    return task;
  }
}
