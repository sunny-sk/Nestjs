import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestModule } from './tests/tests.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { CategoryModule } from './category/category.module';
import { RouterModule, Routes } from 'nest-router';
import { QuestionsModule } from './questions/questions.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { InterviewsService } from './interviews/interviews.service';
import { InterviewsModule } from './interviews/interviews.module';
// const routes: Routes = [
//   {
//     path: '/admin/category',
//     module: UsersModule,
//     childrens: [
//       {
//         path: ':id',
//         module: CategoryModule,
//       },
//     ],
//   },
// ];
@Module({
  imports: [
    // RouterModule.forRoutes(routes),
    MongooseModule.forRoot('mongodb://localhost:27017/test', {
      useUnifiedTopology: true,
      useFindAndModify: true,
      useNewUrlParser: true,
    }),
    TestModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    QuestionsModule,
    FeedbacksModule,
    InterviewsModule,
  ],
  controllers: [AppController],
  // controllers: [AuthController,AppController],
  providers: [InterviewsService],
})
export class AppModule {}
