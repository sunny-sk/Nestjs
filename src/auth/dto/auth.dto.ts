import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class signInDto {
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
export class EmailDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class PasswordUpdateDto {
  @IsDefined()
  @IsString()
  @MaxLength(10)
  @MinLength(5)
  newPassword: string;
}
