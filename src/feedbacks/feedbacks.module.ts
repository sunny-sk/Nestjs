import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { feedbackSchema } from './feedback.model';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Feedback', schema: feedbackSchema }]),
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
  exports: [FeedbacksService],
})
export class FeedbacksModule {}
