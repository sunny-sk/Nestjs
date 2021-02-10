import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminController, UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.model';
import { AuthModule } from 'src/auth/auth.module';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController, AdminController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
