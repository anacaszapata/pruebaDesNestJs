import { PartialType } from '@nestjs/swagger';
import { CreateResultDto } from './create-resultado.dto';

export class UpdateResultadoDto extends PartialType(CreateResultDto) {}
