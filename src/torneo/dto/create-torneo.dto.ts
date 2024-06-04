import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateTorneoDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  jugadoresIds?: number[];
}
