import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/utils/Error';
import { AuthService } from './auth.service';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signup() {
    console.log('signin');
  }

  @Post('signin')
  async signin(
    @Body() body: { email: string; password: string }
  ): Promise<any> {
    const user = await this.authService.validateUser(body);
    return this.authService.login(user._id);
  }
}
