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
import { StartTestDto, TestDto } from './dto/test.dto';
import { CandidateFeedbackDto } from 'src/common/dto/feedback.dto';
@Controller('tests')
@ApiTags('tests')
@UseFilters(HttpExceptionFilter)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class TestController {
  constructor(private readonly testService: TestsService) {}

  @Get(':id')
  async getTest(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() data: StartTestDto
  ) {
    return this.testService.getTest(id, data);
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

  @Post(':id/start')
  async startTest(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() data: StartTestDto
  ) {
    return this.testService.startTest(id, data);
  }

  @Post(':id/feedback/:password')
  async submitFeedback(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('password') password: string,
    @Body() feedback: CandidateFeedbackDto
  ) {
    return this.testService.submitFeedback(id, password, feedback);
  }

  @Post(':testId/saveStatus/:password')
  async saveStatus(
    @Param('testId', ParseObjectIdPipe) testId: string,
    @Param('password') password: string,
    @Body('answer') answer: string,
    @Body('questionId', ParseObjectIdPipe) questionId: string
  ) {
    return this.testService.saveStatus(testId, questionId, password, answer);
  }

  @Post(':id/finish/:password')
  async finishTest(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('password') password: string,
    @Body('answers') answers: any
  ) {
    return this.testService.finishTest(id, password, answers);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin, ROLE.TALENTAQ]))
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    return this.testService.delete(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin, ROLE.TALENTAQ]))
  async create(@Body() data: TestDto, @Req() req) {
    return this.testService.create(data, req.user);
  }

  //TODO:  api for random test generate for single person
  @Post()
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin, ROLE.TALENTAQ]))
  async generateSingleRandomTest() {
    //
  }
  //TODO: generatePDF and get it's link as well as download link
  @Post()
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin, ROLE.TALENTAQ]))
  async generateTestPdf() {
    //
  }

  //TODO: reset test
  @Post()
  @UseGuards(AuthGuard('jwt'), new RolesGuard([ROLE.Admin, ROLE.TALENTAQ]))
  async resetTest() {
    //
  }
}

//TODO: can't update test if is started
//TODO: after submit calculate result
