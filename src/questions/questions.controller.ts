import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/Error';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/question.dto';
import { ROLE } from 'src/constants/constant';
import { RolesGuard } from 'src/gaurd/role.gaurd';
import { ParseObjectIdPipe } from '../pipe/ParseObjectIdPipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/FileUpload';
@Controller('questions')
@ApiTags('questions')
@UseFilters(HttpExceptionFilter)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    //TODO:// add filter and pagination here
    return this.questionService.getAll();
  }
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.questionService.getOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin, ROLE.INTERVIEWER]))
  create(@Body() question: CreateQuestionDto, @Req() req) {
    return this.questionService.create(question, req.user);
  }
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin, ROLE.INTERVIEWER]))
  delete(@Param('id', ParseObjectIdPipe) id: string) {
    return this.questionService.delete(id);
  }

  //TODO: add validation for updateQuestion

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin, ROLE.INTERVIEWER]))
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updatedQuestion: UpdateQuestionDto,
    @Req() req
  ) {
    return this.questionService.update(id, updatedQuestion, req.user);
  }

  @Get('sample/:type/download')
  @Header('Content-Disposition', 'attachment; filename=optional_questions.xlsx')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
  @Header('Content-Type', 'application/vnd.ms-excel')
  downloadSample(@Param('type') type: string, @Res() res) {
    return this.questionService.downloadSample(type, res);
  }

  @Post('sample/:type/upload')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin, ROLE.INTERVIEWER]))
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadQuestions(
    @Param('type') type: string,
    @UploadedFile() file,
    @Req() req
  ) {
    return this.questionService.uploadQuestions(type, file, req.user);
  }
}

/**
 * create question
 *     * admin
 *     * interviwer
 * get all question
 *     * pagination
 *     * filter
 * get all queestions by id  =  done
 *     * all except user
 * update question
 *     * update by created person and admin only
 * delete question
 *     * admin only
 * approve questions
 *     * admin  - in one click
 *     * interviewer - atleast three approvel  // not sure about this featue
 * download question sample
 *     * optional sample
 *     * others type sample
 * upload question using file
 *     * optional sample
 *     * others type sample
 *
 */
