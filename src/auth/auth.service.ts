import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Error } from 'src/utils/Error';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signup(authCredentialsDto);
  }
  async signin(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto
    );
    if (!username) {
      throw new Error(false, 'Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
