import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Error } from 'src/utils/Error';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.model';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async hashPassword(pass: string, salt: string): Promise<string> {
    return bcrypt.hash(pass, salt);
  }

  async addUSer(newUser: CreateUserDto) {
    const user: User = new this.userModel({
      ...newUser,
    });
    try {
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(user.password, user.salt);
      return await user.save();
    } catch (error) {
      console.log(error);
      throw new Error(
        false,
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(data: any) {
    return await this.userModel.findOne(data);
  }
  async findById(id: string) {
    return await this.userModel.findById(id);
  }
}
