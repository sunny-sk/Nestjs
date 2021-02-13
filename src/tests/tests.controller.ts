/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/Error';
import { TestsService } from './tests.service';
import { ParseObjectIdPipe } from '../pipe/ParseObjectIdPipe';
import { RolesGuard } from 'src/gaurd/role.gaurd';
import { ROLE } from 'src/constants/constant';
import { TestDto } from './dto/test.dto';
@Controller('tests')
@ApiTags('tests')
@UseFilters(HttpExceptionFilter)
@UsePipes(new ValidationPipe())
export class TestController {
  constructor(private readonly testService: TestsService) {}

  @Get(':id')
  async getOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.testService.getOne(id);
  }

  @Post(':id/start')
  async startTest(@Param('id', ParseObjectIdPipe) id: string) {
    return this.testService.startTest(id);
  }
  @Post(':id/feedback')
  async submitFeedback(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body('feedback') feedback: string
  ) {
    return this.testService.submitFeedback(id, feedback);
  }
  @Post(':testId/saveStatus')
  async saveStatus(
    @Param('testId', ParseObjectIdPipe) testId: string,
    @Body('answer') answer: string,
    @Body('questionId', ParseObjectIdPipe) questionId: string
  ) {
    return this.testService.saveStatus(testId, questionId, answer);
  }
  @Post(':id/finish')
  async finishTest(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body('answers') answers: any
  ) {
    return this.testService.finishTest(id, answers);
  }
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin, ROLE.TALENTAQ]))
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    return this.testService.delete(id);
  }
  @Get(':id/view')
  @UseGuards(
    AuthGuard('jwt'),
    new RolesGuard([ROLE.Admin, ROLE.TALENTAQ, ROLE.INTERVIEWER])
  )
  async viewTest(@Param('id', ParseObjectIdPipe) id: string) {
    return this.testService.viewTest(id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin, ROLE.TALENTAQ]))
  async getAll() {
    return this.testService.getAll();
  }
  @Post()
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin, ROLE.TALENTAQ]))
  async create(@Body() data: TestDto, @Req() req) {
    return this.testService.create(data, req.user);
  }
}

//TODO:  api for random test generate for single person
//TODO: generatePDF and get it's link as well as download link
//TODO: can't update test if is started
//TODO: after submit calculate result
