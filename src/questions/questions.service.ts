import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { User } from 'src/users/user.model';
import { Error } from 'src/utils/Error';
import { CreateQuestionDto, File } from './dto/question.dto';
import { Question } from './questions.model';
import readXlsxFile from 'read-excel-file/node';
import * as fs from 'fs';
import * as path from 'path';
import * as xl from 'excel4node';
import {
  LEVEL,
  OPTIONAL_QUESTION_SAMPLE_SHEET_DUMMY,
  OPTIONS,
  TYPE,
} from 'src/constants/constant';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel('Question') private readonly questionModel: Model<Question>,
    private readonly categoryService: CategoryService
  ) {}
  async getAll() {
    const x = await this.questionModel
      .find({})
      .select('-options._id')
      .populate({ path: 'category createdBy', select: 'name email' });
    return {
      success: true,
      code: 200,
      count: x.length,
      questions: x,
    };
  }
  async create(question: CreateQuestionDto, user: User) {
    const { category, options } = question;
    await this.categoryService.findByID(category);
    if (options && options.length < 4) {
      throw new Error(
        false,
        'Options length should be four',
        HttpStatus.BAD_REQUEST
      );
    }
    try {
      let newQuestion = new this.questionModel({
        ...question,
      });
      newQuestion.createdBy = user._id;
      await newQuestion.save();
      newQuestion = await this.questionModel
        .findById(newQuestion._id)
        .select('-options._id')
        .populate('category');
      return {
        success: true,
        code: 200,
        question: newQuestion,
      };
    } catch (error) {
      if (error.code == 11000) {
        throw new Error(
          false,
          'question name should be unique',
          HttpStatus.BAD_REQUEST
        );
      } else {
        throw new Error(
          false,
          'server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
  async update(id: string, question: CreateQuestionDto, user: User) {
    try {
      const { category, options } = question;
      await this.categoryService.findByID(category);

      if (options && options.length < 4) {
        throw new Error(
          false,
          'Options length should be four',
          HttpStatus.BAD_REQUEST
        );
      }
      let newQuestion = new this.questionModel({
        ...question,
      });
      newQuestion.createdBy = user._id;
      await newQuestion.save();
      newQuestion = await this.questionModel
        .findById(newQuestion._id)
        .populate('category');
      return {
        success: true,
        code: 200,
        question: newQuestion,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string) {
    const isExist = await this.questionModel.findByIdAndDelete(id);
    if (!isExist) {
      throw new Error(
        false,
        'question not found with this id',
        HttpStatus.BAD_REQUEST
      );
    }
    return {
      success: true,
      code: 200,
      message: ' question deleted successfully',
    };
  }

  async downloadSample(type, res) {
    let { categories } = await this.categoryService.getAll();
    categories = categories.map((e: any) => {
      return e.name;
    });
    if (categories.length === 0) {
      throw new Error(false, 'no category exist ', HttpStatus.NOT_ACCEPTABLE);
    }
    const wb = new xl.Workbook();
    const ws1 = wb.addWorksheet('sheet1');
    let filepath = path.join(__dirname, '../../public/samples/');

    if (type === 'optional') {
      ws1.cell(1, 1).string('question');
      ws1.cell(1, 2).string('category');
      ws1.cell(1, 3).string('level');
      ws1.cell(1, 4).string('option_A');
      ws1.cell(1, 5).string('option_B');
      ws1.cell(1, 6).string('option_C');
      ws1.cell(1, 7).string('option_D');
      ws1.cell(1, 8).string('answer');

      OPTIONAL_QUESTION_SAMPLE_SHEET_DUMMY[1].formulas = [
        categories.join(', '),
      ];
      OPTIONAL_QUESTION_SAMPLE_SHEET_DUMMY[2].formulas = [
        `${LEVEL.BEGINNER}, ${LEVEL.INTERMEDIATE}, ${LEVEL.MASTER}`,
      ];

      OPTIONAL_QUESTION_SAMPLE_SHEET_DUMMY.forEach((e) => {
        ws1.addDataValidation({
          ...e,
        });
      });
      wb.write(filepath + 'optional_questions.xlsx', (err, stats) => {
        if (err) {
          // thow err
        } else {
          fs.readFile(filepath + 'optional_questions.xlsx', {}, (err, data) => {
            if (err) {
              // thow err
            } else {
              res.send(data);
            }
          });
        }
      });
    } else {
      filepath = filepath + 'questions.xlsx';
      ws1.cell(1, 1).string('question');
      ws1.cell(1, 2).string('category');
      ws1.cell(1, 3).string('level');
      ws1.cell(1, 4).string('type');
      ws1.cell(1, 5).string('answer');
    }
  }
  async uploadQuestions(type: string, file: File, user) {
    console.log(type);
    if (type.toLocaleLowerCase() == TYPE.OPTIONAL.toLocaleLowerCase()) {
      const filepath = path.join(
        __dirname,
        '../../public/uploads/' + file.filename
      );

      const { categories } = await this.categoryService.getAll();

      const questions: Question[] = [];
      const rows = await readXlsxFile(filepath);
      if (rows[0].length > 8) {
        // throw error of invalid file Format
        throw new Error(
          false,
          'invalid format of file',
          HttpStatus.BAD_REQUEST
        );
      }
      rows.forEach((row, i) => {
        if (i !== 0) {
          questions.push(
            new this.questionModel({
              question: row[0],
              category: categories.find((e) => e.categoryName == row[1])._id,
              level: row[2],
              type: TYPE.OPTIONAL,
              options: [
                {
                  option: OPTIONS.A,
                  ans: row[3],
                },
                {
                  option: OPTIONS.B,
                  ans: row[4],
                },
                {
                  option: OPTIONS.C,
                  ans: row[5],
                },
                {
                  option: OPTIONS.D,
                  ans: row[6],
                },
              ],
              answer: row[7],
              isValid: false,
              createdBy: user._id,
            })
          );
        }
      });
      const res = await this.questionModel.insertMany(questions);
      return res;
    } else {
    }
  }
}
