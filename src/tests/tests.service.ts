import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CandidateFeedbackDto } from 'src/common/dto/feedback.dto';
import { FeedbacksService } from 'src/feedbacks/feedbacks.service';
import { Error } from 'src/utils/Error';
import { BAD_REQUEST, NOT_FOUND } from 'src/utils/ErrorResponse';
import { StartTestDto, TestDto } from './dto/test.dto';
import { Test } from './tests.model';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/auth/email.service';
@Injectable()
export class TestsService {
  constructor(
    @InjectModel('Test') private readonly testModel: Model<Test>,
    private readonly feedbackService: FeedbacksService,
    private readonly emailService: EmailService
  ) {}

  //TODO:/ add filter here
  async getAll() {
    const x = await this.testModel
      .find({})
      .populate({
        path: 'createdBy questions.questionId feedback',
        select: 'name email options title message suggestion',
      })
      .exec();
    return {
      success: true,
      code: 200,
      count: x.length,
      tests: x,
    };
  }
  /**
   *
   * submit feedback
   */
  async submitFeedback(
    id: string,
    password: string,
    feedback: CandidateFeedbackDto
  ) {
    const test = await this.testModel.findById(id);
    if (!test) {
      NOT_FOUND('test not found with this id');
    } else if (!test.isValid) {
      BAD_REQUEST('Test Link expired');
    } else if (!test.startedAt) {
      BAD_REQUEST('test not started yet, please start test');
    } else if (test.feedback) {
      BAD_REQUEST("there is already a feedback, can't submit again");
    } else if (!test.isFinished) {
      BAD_REQUEST("can't submit test not finished yet");
    } else if (test.password !== password) {
      BAD_REQUEST("can't submit feedback password doesn't match");
    }
    const { _id } = await this.feedbackService.addCandidateFeedback(feedback);
    test.feedback = _id;
    test.isValid = false;
    await test.save();
    return {
      success: true,
      code: 200,
      message: 'feedback submitted successfully',
    };
  }

  /**
   *
   * get test
   */
  async getTest(id: string, data: StartTestDto) {
    const test = await this.testModel.findById(id);
    if (!test) {
      NOT_FOUND('test not found with this id');
    }
    if (
      test.password == data.password &&
      test.candidateEmail == data.candidateEmail
    ) {
      //TODO: remove un neccessary field for candidate
      return test;
    }
    BAD_REQUEST('invalid test credentials');
  }
  /**
   *
   * view test
   */
  async viewTest(id: string) {
    const test = await this.testModel.findById(id).populate({
      path: 'createdBy questions.questionId',
      select: 'name email options',
    });
    if (!test) {
      NOT_FOUND('test not found with this id');
    }
    return test;
  }
  /**
   * create Test
   * */
  async create(data: TestDto, user) {
    const test = new this.testModel({
      ...data,
    });

    test.password = uuidv4();
    test.createdBy = user._id;
    try {
      await test.save();
      this.emailService.sendMail(
        test.candidateEmail,
        test.forPosition ? test.forPosition : 'TFT TEST',
        `<h1>https://localhost:3001/tests/${test._id} </h1>
        <br/>
        email : ${test.candidateEmail}
        <b1/>
        testPassword :${test.password}
        `
      );
      return test;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *  start test
   */
  async startTest(id: string, data: StartTestDto) {
    const test = await this.testModel.findById(id);
    if (!test) {
      NOT_FOUND('test not found with this id');
    } else if (
      test.candidateEmail !== data.candidateEmail ||
      test.password.toString() !== data.password
    ) {
      BAD_REQUEST('Invalid credentials');
    } else if (test.startedAt) {
      BAD_REQUEST('cannot start test again');
    }

    test.startedAt = new Date();
    await test.save();
    return {
      success: true,
      code: 200,
      message: 'test started',
    };
  }

  async saveStatus(
    testId: string,
    questionId: string,
    password: string,
    answer: string
  ) {
    const test = await this.testModel.findById(testId);
    if (!test) {
      NOT_FOUND('test not found with this id');
    } else if (!test.startedAt) {
      BAD_REQUEST('test not started yet, please start test');
    } else if (test.finishedAt) {
      BAD_REQUEST("test finished, can't do anything");
    } else if (!test.isValid) {
      BAD_REQUEST('test is not valid now');
    } else if (test.password !== password) {
      BAD_REQUEST("can't save status password do not match");
    }

    test.questions.forEach(
      (element: { questionId: string; submittedAns: string }) => {
        if (element.questionId == questionId && answer) {
          element.submittedAns = answer;
        }
      }
    );
    await test.save();
    return test;
  }
  /**
   * finish test
   */
  async finishTest(
    id: string,
    password: string,
    answers: { questionId: string; answer: string }[]
  ) {
    const test = await this.testModel.findById(id);
    if (!test) {
      NOT_FOUND('test not found with this id');
    } else if (!test.startedAt) {
      BAD_REQUEST("can't finish, test not started yet");
    } else if (test.finishedAt) {
      BAD_REQUEST('Test submitted already');
    } else if (test.password !== password) {
      BAD_REQUEST("can't finish test password do not match");
    }
    test.isFinished = true;
    test.finishedAt = new Date();
    const allQuestions: any[] = [...test.questions];

    answers.forEach((e) => {
      const index = allQuestions.findIndex(
        (o: any) => o.questionId == e.questionId
      );

      if (index > -1 && e.answer) {
        allQuestions[index].submittedAns = e.answer;
      }
    });
    test.questions = allQuestions;

    await test.save();
    return {
      success: true,
      code: 200,
      message: 'test finished successfully',
    };
  }

  /**
   * delete test by id
   */
  async delete(id: string) {
    const test = await this.testModel.findByIdAndDelete(id);
    if (!test) {
      throw new Error(
        false,
        'test not found with this id',
        HttpStatus.NOT_FOUND
      );
    }
    return {
      success: true,
      code: 200,
      message: 'test deleted successfully',
    };
  }
}
