import { Injectable, NotFoundException } from '@nestjs/common';
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

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((e) => e.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (e) => e.title.includes(search) || e.description.includes(search)
  //     );
  //   }
  //   return tasks;
  // }
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
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     title,
  //     description,
  //     id: uuidv4(),
  //     createdAt: new Date(),
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string): string {
  //   this.getTaskById(id);
  //   this.tasks = this.tasks.filter((e) => e.id != id);
  //   return 'deleted';
  // }
  // updateTaskStatus(id: string, newStatus: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = newStatus;
  //   return task;
  // }
}
