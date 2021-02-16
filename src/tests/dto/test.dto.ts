import {
  IsDefined,
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class TestDto {
  @IsString()
  @IsDefined()
  @MinLength(3)
  @MaxLength(10)
  candidateName: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  candidateEmail: string;

  @IsBoolean()
  oneTimeAccess: boolean;

  @IsOptional()
  description: string;

  //TODO: add validation for this
  @IsArray()
  @ArrayMinSize(1)
  questions;
}
export class StartTestDto {
  @IsString()
  @IsDefined()
  password: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  candidateEmail: string;
}
