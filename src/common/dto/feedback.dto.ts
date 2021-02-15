import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CandidateFeedbackDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(5)
  message: string;
}
