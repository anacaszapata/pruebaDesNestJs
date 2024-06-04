import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateJugadorDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  score?: number;
}
