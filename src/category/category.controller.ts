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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ROLE } from 'src/constants/constant';
import { RolesGuard } from 'src/gaurd/role.gaurd';
import { HttpExceptionFilter } from 'src/utils/Error';
import { ParseObjectIdPipe } from '../pipe/ParseObjectIdPipe';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';
@Controller()
@UseFilters(HttpExceptionFilter)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/category/getall')
  getAll() {
    return this.categoryService.getAll();
  }
  @Post('admin/category')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin]))
  create(@Body() category: CreateCategoryDto) {
    return this.categoryService.create(category);
  }
  @Delete('admin/category/:id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin]))
  delete(@Param('id', ParseObjectIdPipe) id: string) {
    return this.categoryService.delete(id);
  }
  @Put('admin/category/:id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin]))
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() category: CreateCategoryDto
  ) {
    return this.categoryService.update(id, category);
  }
}
