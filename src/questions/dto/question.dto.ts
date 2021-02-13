import { Optional } from '@nestjs/common';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { LEVEL, TYPE } from 'src/constants/constant';
import { IsRefId } from 'src/utils/CustomValidators';

export class CreateQuestionDto {
  @IsDefined()
  @IsString()
  @MinLength(10)
  name: string;

  @IsDefined()
  @IsEnum(TYPE, { each: true })
  type: string;

  @IsDefined()
  @IsEnum(LEVEL, { each: true })
  level: string;

  @IsDefined()
  @Validate(IsRefId)
  category: string;

  @IsString()
  answer: string;

  options: any[];
}
