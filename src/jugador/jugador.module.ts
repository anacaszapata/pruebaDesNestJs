import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jugador } from './entities/jugador.entity';
import { JugadorService } from './jugador.service';
import { JugadorController } from './jugador.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Jugador])],
  providers: [JugadorService],
  controllers: [JugadorController],
  exports: [JugadorService]
})
export class JugadorModule {}
