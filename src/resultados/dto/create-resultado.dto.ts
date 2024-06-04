// create-result.dto.ts
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateResultDto {
  @IsNumber()
  @IsNotEmpty()
  winnerId: number;

  @IsNumber()
  @IsNotEmpty()
  loserId: number;

  @IsNumber()
  @IsNotEmpty()
  score: number;
}
