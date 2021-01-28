import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MaxLength(20)
  @MinLength(4)
  username: string;

  @IsString()
  @MaxLength(20)
  @MinLength(4)
  @Matches(/((?=.*\w+))(?=.*\w+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too week',
  })
  password: string;
}
