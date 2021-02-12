import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminController, UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.model';
// import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
@Module({
  imports: [
    CategoryModule,
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    // forwardRef(() => AuthModule),
  ],
  controllers: [UsersController, AdminController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
