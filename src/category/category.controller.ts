import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ROLE } from 'src/constants/constant';
import { RolesGuard } from 'src/gaurd/role.gaurd';
import { HttpExceptionFilter } from 'src/utils/Error';
import { ParseObjectIdPipe } from '../pipe/ParseObjectIdPipe';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
@Controller('category')
@UseFilters(HttpExceptionFilter)
@UsePipes(new ValidationPipe())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('')
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.categoryService.getAll();
  }
  @Post('')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin, ROLE.INTERVIEWER]))
  create(@Body() category: CategoryDto) {
    return this.categoryService.create(category);
  }
  @Delete('/category/:id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin]))
  delete(@Param('id', ParseObjectIdPipe) id: string) {
    return this.categoryService.delete(id);
  }
  @Put('category/:id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin]))
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() category: CategoryDto
  ) {
    return this.categoryService.update(id, category);
  }
}
