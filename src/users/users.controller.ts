import { Controller, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/Error';

@ApiTags('user')
@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {}
