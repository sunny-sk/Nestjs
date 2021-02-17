import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Error } from 'src/utils/Error';
import { Category } from './category.model';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>
  ) {}
  async getAll() {
    const categories = await this.categoryModel.find({});
    return {
      success: true,
      code: 200,
      count: categories.length,
      categories,
    };
  }

  async findByID(id: string) {
    const cat = await this.categoryModel.findById(id);
    if (!cat) {
      throw new Error(
        false,
        'category not found with this id',
        HttpStatus.NOT_FOUND
      );
    }
    return cat;
  }

  async create(category: CategoryDto) {
    try {
      const newCategory = new this.categoryModel({ ...category });
      await newCategory.save();
      return {
        success: true,
        code: 200,
        category: newCategory,
      };
    } catch (error) {
      console.log(error);
      if (error.code == 11000) {
        throw new Error(
          false,
          'Category already exist, should be unique',
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }
  async delete(id: string) {
    const x = await this.categoryModel.findByIdAndDelete(id);
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
  async update(id: string, category: CategoryDto) {
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
