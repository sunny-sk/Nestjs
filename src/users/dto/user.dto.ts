import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ROLE } from 'src/constants/constant';

export interface UserDto {
  name: string;
  _id: string;
  password: string;
  email: string;
  status: boolean;
}
export class UpdateUserDto {
  @IsDefined()
  @IsString()
  @MaxLength(32)
  @MinLength(5)
  name: string;

  @IsArray()
  skills: string[];
}
export class LoginDto {
  @IsDefined()
  @IsString()
  @MaxLength(10)
  @MinLength(5)
  password: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;
}
export class StatusDto {
  @IsDefined()
  @IsBoolean()
  status: boolean;
}
export class PasswordUpdateDto {
  @IsDefined()
  @IsString()
  @MaxLength(10)
  @MinLength(5)
  oldPassword: string;
  @IsDefined()
  @IsString()
  @MaxLength(10)
  @MinLength(5)
  newPassword: string;
}

export class RoleDto {
  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsEnum(ROLE, { each: true })
  roles: ROLE[];
}
