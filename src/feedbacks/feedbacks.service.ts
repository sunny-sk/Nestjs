import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CandidateFeedbackDto,
  UpdateFeedbackDto,
} from 'src/common/dto/feedback.dto';
import { Feedback } from './feedback.model';
import { NOT_FOUND } from '../utils/ErrorResponse';
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

  async updateFeedback(id: string, upFeedback: UpdateFeedbackDto) {
    const feedback = await this.feedbackModel.findByIdAndUpdate(
      id,
      {
        ...upFeedback,
      },
      { new: true, runValidators: true }
    );
    if (!feedback) {
      NOT_FOUND('feedback not found with this id');
    }
    return feedback;
  }
}
