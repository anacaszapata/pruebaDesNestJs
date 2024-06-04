import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateTorneoDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  jugadoresIds?: number[];

  @IsOptional()
  @IsArray()
  resultadosIds?: number[];
}
