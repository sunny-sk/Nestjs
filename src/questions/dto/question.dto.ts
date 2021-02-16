import {
  IsDefined,
  IsEnum,
  IsOptional,
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
  question: string;

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
  @IsOptional()
  answer: string;

  options: any[];
}

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  filename: string;
  destination: string;
}
