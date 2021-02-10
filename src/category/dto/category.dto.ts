import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsDefined()
  @IsString()
  @MaxLength(32)
  @MinLength(1)
  name: string;
}

export class UpdateCategoryDto {
  @IsDefined()
  @IsString()
  @MaxLength(32)
  @MinLength(1)
  name: string;
}
