import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Error } from 'src/utils/Error';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async addTask(title: string, description: string) {
    const task = new this.taskModel({
      title,
      description,
    });
    await task.save();
    return task;
  }

  async getAll() {
    const tasks = await this.taskModel.find().exec();
    return tasks as Task[];
  }

  async getOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new Error(false, 'task not found', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async updateTask(id: string, updatebleTask: Task) {
    const task = await this.taskModel.findByIdAndUpdate(id, updatebleTask, {
      runValidators: true,
      new: true,
    });
    if (!task) {
      throw new Error(false, 'task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async deleteTask(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id);
    if (!task) {
      throw new Error(false, 'task not found', HttpStatus.NOT_FOUND);
    }
    return { success: true };
  }
}
