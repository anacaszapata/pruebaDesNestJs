import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { JugadorService } from './jugador.service';
import { JugadorController } from './jugador.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [JugadorService],
  controllers: [JugadorController],
  exports: [JugadorService]
})
export class JugadorModule {}
