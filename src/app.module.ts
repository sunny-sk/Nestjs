import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { CategoryModule } from './category/category.module';
import { RouterModule, Routes } from 'nest-router';
import { QuestionsService } from './questions/questions.service';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsModule } from './questions/questions.module';
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
    TasksModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  // controllers: [AuthController,AppController],
  providers: [],
})
export class AppModule {}
