import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/Error';
import { AuthService } from './auth.service';
import { LoginDto, CreateUserDto, googleAuthDto } from './dto/user.dto';

@ApiTags('auth')
@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req) {
  //   // return 'Hellow orld';
  // }

  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // async googleAuthRedirect(@Req() req) {
  //   return this.authService.googleLogin(req);
  // }

  @Post('google')
  @UsePipes(new ValidationPipe())
  @ApiConsumes('application/json')
  @ApiOkResponse({
    status: 201,
    description: 'user registered successfully',
  })
  @ApiOkResponse({
    status: 200,
    description: 'user loggedIn successfully',
  })
  googleAuth(@Body() newUser: googleAuthDto) {
    return this.authService.googleAuth(newUser);
  }

  @Post('signup')
  @UsePipes(new ValidationPipe())
  @ApiConsumes('application/json')
  @ApiOkResponse({
    status: 201,
    description: 'user registered successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'email already exist',
  })
  signup(@Body() newUser: CreateUserDto) {
    return this.authService.signupUser(newUser);
  }

  @Get('me')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  getMe(@Req() req) {
    return this.authService.getMe(req.user._id);
  }

  @Post('signin')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @ApiConsumes('application/json')
  @ApiOkResponse({
    status: 200,
    description: 'user signin successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'invalid credentials',
  })
  async signin(@Body() body: LoginDto): Promise<any> {
    return await this.authService.signinUser(body);
  }
}
