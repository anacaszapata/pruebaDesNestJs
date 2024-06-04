import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateJugadorDto {
  @ApiProperty({ example: 'Ana Sofia', description: 'The name of the player' })
  @IsString()
  name: string;

  @ApiProperty({ example: '1200', description: 'The score of the player during the tournament' })
  @IsOptional()
  @IsNumber()
  score?: number;
}
