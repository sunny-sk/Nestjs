import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/utils/Error';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
