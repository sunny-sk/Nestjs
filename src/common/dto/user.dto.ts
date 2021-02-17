import {
  IsArray,
  IsDefined,
  IsEmail,
  IsOptional,
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
  @MaxLength(32)
  @MinLength(5)
  empId: string;

  @IsDefined()
  @IsString()
  @MaxLength(10)
  @MinLength(5)
  password: string;

  @IsArray()
  @IsOptional()
  skills: string[];

  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;
}
