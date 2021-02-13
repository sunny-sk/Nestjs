import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Error } from 'src/utils/Error';
import { Test } from './tests.model';

@Injectable()
export class TestsService {
  constructor(@InjectModel('Test') private readonly taskModel: Model<Test>) {}

  async addTask() {
    //
  }

  async getAll() {
    //
  }

  async getOne() {
    //
  }

  async updateTest() {
    //
  }

  async deleteTest() {
    //
  }
}
