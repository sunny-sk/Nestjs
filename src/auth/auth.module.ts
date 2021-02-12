import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { SECRET } from '../constants/constant';
import { GoogleStrategy } from './google.strategy';
import { EmailService } from './email.service';

@Module({
  imports: [
    UsersModule,
    // forwardRef(() => UsersModule),
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: 3600 },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, AuthStrategy, GoogleStrategy],
  exports: [AuthService, PassportModule, AuthStrategy, GoogleStrategy],
})
export class AuthModule {}
