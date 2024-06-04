import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateTorneoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsArray()
  jugadoresIds?: number[];

  @IsOptional()
  @IsArray()
  resultadosIds?: number[];
}
