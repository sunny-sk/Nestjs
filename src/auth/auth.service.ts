import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Error } from 'src/utils/Error';
import * as _ from 'lodash';
import { CreateUserDto } from '../common/dto/user.dto';
import { OAuth2Client } from 'google-auth-library';
import { signInDto } from './dto/auth.dto';
const client = new OAuth2Client({
  clientId:
    '830257501118-uvd4so049dgeg6d4djkpkrgl963ec0mi.apps.googleusercontent.com',
  clientSecret: 'f0yIa6gpoTlBojbGd9g7JTP5',
});
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async googleAuth(req) {
    try {
      const { tokenId } = req;
      const res = await client.verifyIdToken({ idToken: tokenId });

      return;

      // const { email, name, at_hash } = res.getPayload();
      // const check = await this.userService.findOne({
      //   email,
      // });

      // if (check) {
      //   //send login token
      //   return this.signinUser({ email, password: email + at_hash });
      // } else {
      //   //register and send login token
      //   const user = await this.userService.addUSer({
      //     email,
      //     name,
      //     password: email + at_hash,
      //   });
      //   return {
      //     success: true,
      //     code: 201,
      //     message: 'user registered successfully',
      //     user: {
      //       ..._.pick(user, [
      //         '_id',
      //         'name',
      //         'email',
      //         'createdAt',
      //         'emailVerified',
      //         'role',
      //         'updatedAt',
      //       ]),
      //       access_token: this.genAuthtoken(user._id),
      //     },
      //   };
      // }
    } catch (error) {
      //check for error
      throw new Error(false, error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async signupUser(newUser: CreateUserDto) {
    const check = await this.userService.findOne({
      $or: [{ email: newUser.email }, { empId: newUser.empId }],
    });

    if (check) {
      throw new Error(
        false,
        check.email == newUser.email
          ? 'email already exist'
          : 'empid already exist',
        HttpStatus.BAD_REQUEST
      );
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
          'roles',
          'updatedAt',
        ]),
        access_token: this.genAuthtoken(user._id),
      },
    };
  }

  async signinUser(data: signInDto): Promise<any> {
    const user = await this.userService.findOne({ email: data.email });
    if (!user) {
      throw new Error(false, 'Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await this.userService.hashPassword(
      data.password,
      user.salt
    );
    if (user && user.password === hashedPassword) {
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
            'roles',
            'updatedAt',
          ]),
          access_token: this.jwtService.sign({ id: user._id }),
        },
      };
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
            'roles',
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

  async sendResetPasswordLink(email: string) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new Error(false, 'Email not found', HttpStatus.NOT_FOUND);
    }
    const key = Math.random().toString() + new Date().toString();
    user.resetPasswordToken = key;
    const access_token = this.jwtService.sign(
      { id: user._id, key: key },
      { expiresIn: 1800 }
    );
    await user.save();
    //send mail here
    return access_token;
    // send mail here
  }
  async sendEmailVerificationLink(email: string) {
    const user = await this.userService.findOne({ email });
    console.log(user);
    if (!user) {
      throw new Error(false, 'Email not found', HttpStatus.NOT_FOUND);
    } else if (user.emailVerified) {
      throw new Error(false, 'Email already verified', HttpStatus.BAD_REQUEST);
    }
    const key = Math.random().toString() + new Date().toString();
    user.emailVerifyToken = key;
    const access_token = this.jwtService.sign(
      { id: user._id, key: key },
      { expiresIn: 1800 }
    );
    await user.save();
    //send mail here
    return access_token;
    // send mail here
  }
  async verifyEmail(token: string) {
    const data = this.jwtService.verify(token);
    const user = await this.userService.findById(data.id);
    if (!user) {
      throw new Error(false, 'Invalid token', HttpStatus.NOT_FOUND);
    } else if (data.key !== user.emailVerifyToken) {
      throw new Error(false, 'link expired', HttpStatus.NOT_FOUND);
    }

    user.emailVerified = true;
    user.emailVerifyToken = null;
    await user.save();
    return {
      success: true,
      code: 200,
      message: 'Email verified successfully',
    };
    //send mail here
  }
  async resetPassword(token, newPassword: string) {
    try {
      const data = this.jwtService.verify(token);
      const user = await this.userService.findById(data.id);
      if (!user) {
        throw new Error(false, 'Invalid token', HttpStatus.NOT_FOUND);
      } else if (data.key !== user.resetPasswordToken) {
        throw new Error(false, 'link expired', HttpStatus.NOT_FOUND);
      }
      user.password = await this.userService.hashPassword(
        newPassword,
        user.salt
      );
      user.resetPasswordToken = null;
      await user.save();
      return {
        success: true,
        code: 200,
        message: 'Password changed successfully',
      };
    } catch (error) {
      if (error.message === 'invalid signature') {
        throw new Error(false, 'invalid link ', HttpStatus.BAD_REQUEST);
      } else if (error.message === 'link expired') {
        throw new Error(false, error.message, HttpStatus.BAD_GATEWAY);
      } else {
        throw new Error(false, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
