import { ApiProperty } from '@nestjs/swagger';
import {
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
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsString()
  @MaxLength(10)
  @MinLength(5)
  @ApiProperty()
  password: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;
}
export class LoginDto {
  @IsDefined()
  @IsString()
  @MaxLength(10)
  @MinLength(5)
  @ApiProperty()
  password: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;
}
export class googleAuthDto {
  @IsDefined()
  @IsString()
  @ApiProperty()
  tokenId: string;
}
