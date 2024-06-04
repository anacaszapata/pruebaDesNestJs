import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateResultDto {
  @ApiProperty({ example: '2', description: 'The id of the  winner player' })
  @IsNumber()
  @IsNotEmpty()
  winnerId: number;

  @ApiProperty({ example: '1', description: 'The id of the loser player' })
  @IsNumber()
  @IsNotEmpty()
  loserId: number;

  @ApiProperty({ example: '1200', description: 'The score of the player' })
  @IsNumber()
  @IsNotEmpty()
  score: number;
}
