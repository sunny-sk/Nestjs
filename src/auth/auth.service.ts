import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Error } from 'src/utils/Error';
import * as _ from 'lodash';
import { CreateUserDto } from 'src/users/dto/user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signupUser(newUser: CreateUserDto) {
    const check = await this.userService.findOne({
      email: newUser.email,
    });

    if (check) {
      throw new Error(false, 'email already exist', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.addUSer(newUser);
    return {
      success: true,
      code: 201,
      message: 'user registered successfully',
      user: {
        ..._.pick(user, [
          '_id',
          'name',
          'email',
          'createdAt',
          'emailVerified',
          'role',
          'updatedAt',
        ]),
        access_token: this.genAuthtoken(user._id),
      },
    };
  }

  async validateUser(data: { email: string; password: string }): Promise<any> {
    const user = await this.userService.findOne({ email: data.email });
    const hashedPassword = await this.userService.hashPassword(
      data.password,
      user.salt
    );
    if (user && user.password === hashedPassword) {
      return user;
    } else {
      throw new Error(false, 'invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id: string) {
    return this.userService.findById(id);
  }

  async getMe(id: string) {
    const user = await this.getUserById(id);
    if (user) {
      return {
        success: true,
        code: 200,
        user: {
          ..._.pick(user, [
            '_id',
            'name',
            'email',
            'createdAt',
            'emailVerified',
            'role',
            'updatedAt',
          ]),
          access_token: this.genAuthtoken(id),
        },
      };
    } else {
      throw new Error(false, 'invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }

  // @params  jswtPayload
  private genAuthtoken(id: string): string {
    return this.jwtService.sign({ id });
  }

  login(user) {
    return {
      success: true,
      code: 200,
      user: {
        ..._.pick(user, [
          '_id',
          'name',
          'email',
          'createdAt',
          'emailVerified',
          'role',
          'updatedAt',
        ]),
        access_token: this.jwtService.sign({ id: user._id }),
      },
    };
  }
}
