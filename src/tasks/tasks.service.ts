import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Error } from 'src/utils/Error';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((e) => e.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (e) => e.title.includes(search) || e.description.includes(search)
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((e) => e.id == id);
    if (!task) {
      // throw new NotFoundException(`Task with ${id} not found `);
      throw new Error(
        false,
        `task not found with this ${id} id`,
        HttpStatus.NOT_FOUND
      );
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      title,
      description,
      id: uuidv4(),
      createdAt: new Date(),
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): string {
    this.getTaskById(id);
    this.tasks = this.tasks.filter((e) => e.id != id);
    return 'deleted';
  }

  updateTaskStatus(id: string, newStatus: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = newStatus;
    return task;
  }
}
