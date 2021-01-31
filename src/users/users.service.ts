import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Error } from 'src/utils/Error';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { User } from './user.model';
import * as _ from 'lodash';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async signupUser(newUser: CreateUserDto) {
    const check = await this.userModel.findOne({
      email: newUser.email,
    });

    if (check) {
      throw new Error(false, 'email already exist', HttpStatus.CONFLICT);
    }
    const user = new this.userModel({
      ...newUser,
    });

    try {
      await user.save();
      return {
        success: true,
        code: 201,
        message: 'user registered successfully',
        user: _.pick(user, [
          '_id',
          'name',
          'email',
          'createdAt',
          'emailVerified',
          'role',
          'updatedAt',
        ]),
      };
    } catch (error) {}
  }
  async signinUser(loginData: LoginDto) {
    const user = await this.userModel.findOne({ ...loginData });
    if (!user) {
      throw new Error(false, 'invalid credentials', HttpStatus.BAD_REQUEST);
    }
    console.log(user);
    return {
      success: true,
      code: 200,
      user: _.pick(user, [
        '_id',
        'name',
        'email',
        'createdAt',
        'emailVerified',
        'role',
        'updatedAt',
      ]),
    };
  }

  async findOne(data: any) {
    return await this.userModel.findOne(data);
  }
  async findById(id: string) {
    return await this.userModel.findById(id);
  }
}
