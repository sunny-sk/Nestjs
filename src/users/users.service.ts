import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Error } from 'src/utils/Error';
import {
  PasswordUpdateDto,
  RoleDto,
  StatusDto,
  UpdateUserDto,
} from './dto/user.dto';
import { CreateUserDto } from '../common/dto/user.dto';
import { User } from './user.model';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async hashPassword(pass: string, salt: string): Promise<string> {
    return bcrypt.hash(pass, salt);
  }

  async getAllUsers() {
    return this.userModel.find({}).select('-password -salt');
  }

  async assignRoleToUser(id: string, { roles }: RoleDto) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new Error(
        false,
        'User not exist with this id',
        HttpStatus.NOT_FOUND
      );
    }
    const x = [...roles];
    const prevRoles = [...user.roles, ...x];
    user.roles = Array.from(new Set(prevRoles));
    await user.save();
    return {
      success: true,
      code: 200,
      message: 'role assigned successfully',
    };
  }

  // add user to db
  async addUSer(newUser: CreateUserDto) {
    const user: User = new this.userModel({
      ...newUser,
    });
    try {
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(user.password, user.salt);
      return await user.save();
    } catch (error) {
      throw new Error(
        false,
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async blockAndUnBlock(id: string, { status }: StatusDto) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return user;
  }

  //TODO: update profile
  async updateProfile(
    updatableProfileId: string,
    updatedData: UpdateUserDto,
    user: User
  ) {
    // if (!user.role.includes(ROLE.Admin)) {
    //   throw new Error(
    //     false,
    //     'not authorized to perform this operation',
    //     HttpStatus.BAD_REQUEST
    //   );
    // }
    // if (user._id.toString() !== updatableProfileId) {
    //   throw new Error(
    //     false,
    //     'id not matched with loggedin user',
    //     HttpStatus.BAD_REQUEST
    //   );
    // }
    const isExistuser = await this.userModel.findByIdAndUpdate(
      updatableProfileId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!isExistuser) {
      throw new Error(
        false,
        'User not exists with this id',
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }

  async updatePassword(id: string, creds: PasswordUpdateDto) {
    const user = await this.findById(id);
    if (
      user.password !==
      (await (await this.hashPassword(creds.oldPassword, user.salt)).toString())
    ) {
      throw new Error(
        false,
        'Old password is not correct',
        HttpStatus.NON_AUTHORITATIVE_INFORMATION
      );
    } else if (!user) {
      throw new Error(
        false,
        'user not found with this id',
        HttpStatus.NOT_FOUND
      );
    }
    user.password = await this.hashPassword(creds.newPassword, user.salt);
    await user.save();
    return {
      success: true,
      code: 200,
      message: 'Password changed successfully',
    };
  }
  async deleteUser(id: string) {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      if (!user) {
        throw new Error(
          false,
          'user not found with this id',
          HttpStatus.NOT_FOUND
        );
      }
      return {
        success: true,
        code: 200,
        message: 'use deleted successfully',
      };
    } catch (error) {
      //TODO: verify status here
      throw new Error(false, error.message, error.status);
    }
  }

  async findOne(data: any) {
    const user = await this.userModel.findOne(data);
    if (!user) {
      throw new Error(false, 'not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error(false, 'not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
