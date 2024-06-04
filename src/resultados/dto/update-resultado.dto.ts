import { PartialType } from '@nestjs/swagger';
import { CreateResultadoDto } from './create-resultado.dto';

export class UpdateResultadoDto extends PartialType(CreateResultadoDto) {}
