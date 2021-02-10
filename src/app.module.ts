import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test', {
      useUnifiedTopology: true,
      useFindAndModify: true,
      useNewUrlParser: true,
    }),
    TasksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AuthController, AppController],
})
export class AppModule {}
