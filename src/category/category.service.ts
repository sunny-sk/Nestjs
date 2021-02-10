import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Error } from 'src/utils/Error';
import { Category } from './category.model';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>
  ) {}
  getAll() {
    return this.categoryModel.find({});
  }
  async create(category: CreateCategoryDto) {
    const newCategory = new this.categoryModel(category);
    await newCategory.save();
    return {
      success: true,
      code: 200,
      category: {
        ...newCategory,
      },
    };
  }
  async delete(id: string) {
    const x = await this.categoryModel.findByIdAndDelete(id, { new: true });
    if (!x) {
      throw new Error(
        false,
        'Category not found with this id',
        HttpStatus.NOT_FOUND
      );
    }
    return {
      success: true,
      code: 200,
      message: 'deleted successfully',
    };
  }
  async update(id: string, category: CreateCategoryDto) {
    const x = await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
      runValidators: true,
    });
    if (!x) {
      throw new Error(
        false,
        'Category not found with this id',
        HttpStatus.NOT_FOUND
      );
    }
    return {
      success: true,
      code: 200,
      category: { ...x },
    };
  }
}
