import { ArrayMinSize, IsOptional, IsString, MinLength } from 'class-validator';

export class CandidateFeedbackDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(5)
  message: string;
}
export class UpdateFeedbackDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(5)
  message: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  suggetion: string;
}
