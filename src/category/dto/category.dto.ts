import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CategoryDto {
  @IsDefined()
  @IsString()
  @MaxLength(32)
  @MinLength(1)
  categoryName: string;
}
