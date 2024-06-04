import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateTorneoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsArray()
  jugadoresIds?: number[];
}
