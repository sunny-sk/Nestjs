import {
  IsArray,
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @MaxLength(32)
  @MinLength(5)
  name: string;

  @IsDefined()
  @IsString()
  @MaxLength(10)
  @MinLength(5)
  password: string;

  @IsArray()
  skills: string[];

  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;
}
