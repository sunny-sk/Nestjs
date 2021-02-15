import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CandidateFeedbackDto } from 'src/common/dto/feedback.dto';
import { Feedback } from './feedback.model';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>
  ) {}
  async addCandidateFeedback(feedback: CandidateFeedbackDto) {
    const { title, message } = feedback;
    const newFeedback = new this.feedbackModel({
      title,
      message,
    });

    try {
      await newFeedback.save();
      return newFeedback;
    } catch (error) {
      // throw error here
    }
  }

  updateFeedback() {
    //
  }
}
