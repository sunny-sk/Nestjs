import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import * as helmet from 'helmet';
async function bootstrap() {
  const logger = new Logger('bootstarp');
  const config = new DocumentBuilder()
    .setTitle('Nest Apllication')
    .setDescription('Rest api using nest')
    .setVersion('1.0')
    .build();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  SwaggerModule.setup('api', app, document);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.use(helmet());
  app.enableCors();
  const PORT = 3001;
  await app.listen(PORT);
  logger.log('Application listening on port ' + PORT);
}
bootstrap();
