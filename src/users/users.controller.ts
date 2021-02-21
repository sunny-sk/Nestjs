import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ROLE } from 'src/constants/constant';
import { RolesGuard } from 'src/gaurd/role.gaurd';
import { HttpExceptionFilter } from 'src/utils/Error';
import { UsersService } from './users.service';
import {
  StatusDto,
  UpdateUserDto,
  PasswordUpdateDto,
  RoleDto,
} from './dto/user.dto';
import { ParseObjectIdPipe } from '../pipe/ParseObjectIdPipe';
@ApiTags('user')
@Controller('users')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard('jwt'))
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Delete('delete/:id')
  deleteUser(@Param('id', ParseObjectIdPipe) id: string) {
    this.userService.deleteUser(id);
  }
  @Put('update/profile/:id')
  updateProfile(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUserData: UpdateUserDto,
    @Req() req
  ) {
    return this.userService.updateProfile(id, updateUserData, req.user);
  }
  @Put('update/password')
  updatePassword(@Body() credes: PasswordUpdateDto, @Req() req) {
    this.userService.updatePassword(req.user._id, credes);
  }
}
@ApiTags('admin')
@Controller('admin')
@UseFilters(HttpExceptionFilter)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin]))
export class AdminController {
  constructor(private readonly userService: UsersService) {}

  @Get('users/:id')
  getUser(@Param('id', ParseObjectIdPipe) id: string) {
    return this.userService.getUser(id);
  }

  @Get('users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put('blockuser/:id')
  async blockUser(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body('status') status: StatusDto
  ) {
    this.userService.blockAndUnBlock(id, status);
  }
  @Put('assignRoleToUser/:id')
  @UsePipes(new ValidationPipe())
  async assignRoleToUser(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() roles: RoleDto
  ) {
    return this.userService.assignRoleToUser(id, roles);
  }
}

//TODO: pipe for checking is not blocked
// TODO : owner self gaurd
