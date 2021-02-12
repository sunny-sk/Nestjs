import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '830257501118-uvd4so049dgeg6d4djkpkrgl963ec0mi.apps.googleusercontent.com',
      clientSecret: 'f0yIa6gpoTlBojbGd9g7JTP5',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) {
    const { name, _json } = profile;
    done(null, {
      ..._json,
    });
  }
}
