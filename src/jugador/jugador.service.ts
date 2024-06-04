import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jugador } from './entities/jugador.entity';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';

@Injectable()
export class JugadorService {
  constructor(
    @InjectRepository(Jugador)
    private readonly jugadorRepository: Repository<Jugador>,
  ) {}

  create(createJugadorDto: CreateJugadorDto): Promise<Jugador> {
    const jugador = this.jugadorRepository.create(createJugadorDto);
    return this.jugadorRepository.save(jugador);
  }

  findAll(): Promise<Jugador[]> {
    return this.jugadorRepository.find();
  }

  findOne(id: number): Promise<Jugador> {
    return this.jugadorRepository.findOne(id);
  }

  async update(
    id: number,
    updateJugadorDto: UpdateJugadorDto,
  ): Promise<Jugador> {
    await this.jugadorRepository.update(id, updateJugadorDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.jugadorRepository.softDelete(id);
  }
}
