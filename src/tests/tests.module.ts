import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestSchema } from './tests.model';
import { TestController } from './tests.controller';
import { TestsService } from './tests.service';
import { FeedbacksModule } from 'src/feedbacks/feedbacks.module';
import { EmailService } from 'src/auth/email.service';

@Module({
  imports: [
    FeedbacksModule,
    MongooseModule.forFeature([{ name: 'Test', schema: TestSchema }]),
  ],
  controllers: [TestController],
  providers: [TestsService, EmailService],
})
export class TestModule {}
