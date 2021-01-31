import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Error } from 'src/utils/Error';
import { AuthService } from './auth.service';
import { SECRET } from './constant';
@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET,
    });
  }

  async validate(jwtPayLoad: { id: string }): Promise<any> {
    const { id } = jwtPayLoad;
    const user = await this.authService.getUserById(id);
    if (!user) {
      throw new Error(false, 'unAuthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
