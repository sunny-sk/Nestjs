import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Error } from 'src/utils/Error';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(data: { email: string; password: string }): Promise<any> {
    const user = await this.userService.findOne(data);
    if (user && user.password === data.password) {
      return user;
    } else {
      throw new Error(false, 'invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id: string) {
    return this.userService.findById(id);
  }

  login(id: string) {
    return {
      access_token: this.jwtService.sign({ id }),
    };
  }
}
