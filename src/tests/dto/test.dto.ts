import {
  IsDefined,
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsEmail,
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

  description: string;
}
