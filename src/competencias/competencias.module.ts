import { Module } from '@nestjs/common';
import { CompetenciasService } from './competencias.service';
import { CompetenciasController } from './competencias.controller';

@Module({
  controllers: [CompetenciasController],
  providers: [CompetenciasService],
})
export class CompetenciasModule {}
