import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CandidateFeedbackDto } from 'src/common/dto/feedback.dto';
import { FeedbacksService } from 'src/feedbacks/feedbacks.service';
import { Error } from 'src/utils/Error';
import { StartTestDto, TestDto } from './dto/test.dto';
import { Test } from './tests.model';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel('Test') private readonly testModel: Model<Test>,
    private readonly feedbackService: FeedbacksService
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
  async submitFeedback(id: string, feedback: CandidateFeedbackDto) {
    const test = await this.testModel.findById(id);
    if (!test) {
      throw new Error(
        false,
        'test not found with this id',
        HttpStatus.NOT_FOUND
      );
    } else if (!test.isValid) {
      throw new Error(false, 'Test Link expired', HttpStatus.BAD_REQUEST);
    } else if (!test.startedAt) {
      throw new Error(
        false,
        'test not started yet, please start test',
        HttpStatus.BAD_REQUEST
      );
    } else if (test.feedback) {
      throw new Error(
        false,
        "there is already a feedback, can't submit again",
        HttpStatus.NOT_FOUND
      );
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

  async getOne(id: string) {
    const test = await this.testModel.findById(id).populate({
      path: 'createdBy questions.questionId',
      select: 'name email options',
    });
    if (!test) {
      throw new Error(
        false,
        'test not found with this id',
        HttpStatus.NOT_FOUND
      );
    }
    if (!test.isValid) {
      throw new Error(false, 'invalid Link', HttpStatus.NOT_FOUND);
    }
    if (test.isFinished) {
      throw new Error(
        false,
        "Test submitted already can't open",
        HttpStatus.NOT_FOUND
      );
    }
    return test;
  }
  async viewTest(id: string) {
    const test = await this.testModel.findById(id).populate({
      path: 'createdBy questions.questionId',
      select: 'name email options',
    });
    if (!test) {
      throw new Error(
        false,
        'test not found with this id',
        HttpStatus.NOT_FOUND
      );
    }
    return test;
  }
  async create(data: TestDto, user) {
    const test = new this.testModel({
      ...data,
    });
    //TODO: add function or generate random Password
    test.password = data.candidateEmail;
    test.createdBy = user._id;
    try {
      // await test.save();
      return test;
      //TODO: send a test mail template a user with link and password
    } catch (error) {
      console.log(error);
    }
  }

  async startTest(id: string, data: StartTestDto) {
    const test = await this.testModel.findById(id);
    if (!test) {
      throw new Error(
        false,
        'test not found with this id',
        HttpStatus.NOT_FOUND
      );
    } else if (
      data.candidateEmail.trim() !== data.candidateEmail.trim() &&
      data.password !== data.candidateEmail
    ) {
      //TODO: verify this condition
      throw new Error(false, 'Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (test.startedAt) {
      throw new Error(false, 'cannot start test again', HttpStatus.BAD_REQUEST);
    }
    test.startedAt = new Date();
    await test.save();
    return {
      success: true,
      code: 200,
      message: 'test started',
    };
  }
  async saveStatus(testId: string, questionId: string, answer: string) {
    const test = await this.testModel.findById(testId);
    if (!test) {
      throw new Error(
        false,
        'test not found with this id',
        HttpStatus.NOT_FOUND
      );
    } else if (!test.startedAt) {
      throw new Error(
        false,
        'test not started yet, please start test',
        HttpStatus.BAD_REQUEST
      );
    } else if (test.finishedAt) {
      throw new Error(
        false,
        "test finished, can't do anything",
        HttpStatus.BAD_REQUEST
      );
    } else if (!test.isValid) {
      throw new Error(false, 'test is not valid now', HttpStatus.BAD_REQUEST);
    }

    // await test.save();
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
  async finishTest(
    id: string,
    answers: { questionId: string; answer: string }[]
  ) {
    const test = await this.testModel.findById(id);
    if (!test) {
      throw new Error(
        false,
        'test not found with this id',
        HttpStatus.NOT_FOUND
      );
    } else if (!test.startedAt) {
      throw new Error(
        false,
        "can't finish, test not started yet",
        HttpStatus.BAD_REQUEST
      );
    } else if (test.finishedAt) {
      throw new Error(false, 'Test submitted already', HttpStatus.BAD_REQUEST);
    }
    test.isFinished = true;
    test.finishedAt = new Date();
    const allQuestions: any[] = [...test.questions];
    // allQuestions[0].submittedAns = 'alkjhg';
    // test.questions.forEach((e) => {
    //   console.log(e);
    // });

    answers.forEach((e) => {
      const index = allQuestions.findIndex(
        (o: any) => o.questionId == e.questionId
      );

      if (index > -1 && e.answer) {
        allQuestions[index].submittedAns = e.answer;
      }
    });
    test.questions = allQuestions;
    // console.log(allQuestions);

    await test.save();
    return {
      success: true,
      code: 200,
      message: 'test finished successfully',
    };
  }
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
