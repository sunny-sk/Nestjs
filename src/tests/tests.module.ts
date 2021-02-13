import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { TestSchema } from './tests.model';
import { TestController } from './tests.controller';
import { TestsService } from './tests.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Test', schema: TestSchema }]),
    AuthModule,
  ],
  controllers: [TestController],
  providers: [TestsService],
})
export class TestModule {}
