import { HttpStatus } from '@nestjs/common';
import { Error } from 'src/utils/Error';
import { Repository, EntityRepository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(pass: string, salt: string): Promise<string> {
    return bcrypt.hash(pass, salt);
  }

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code == 23505) {
        throw new Error(false, 'username already exist', HttpStatus.CONFLICT);
      } else {
        throw new Error(
          false,
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<string> {
    const { username, password } = authCredentialsDto;

    const user = await this.findOne({ username });
    if (user && user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }
}
