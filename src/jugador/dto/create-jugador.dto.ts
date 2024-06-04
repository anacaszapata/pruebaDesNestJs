import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateJugadorDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsNumber()
  puntaje?: number;
}
