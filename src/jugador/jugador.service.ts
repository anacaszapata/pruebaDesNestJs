import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../jugador/entities/player.entity';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';

@Injectable()
export class JugadorService {
  constructor(
    @InjectRepository(Player)
    private readonly jugadorRepository: Repository<Player>,
  ) {}

  async create(createJugadorDto: CreateJugadorDto): Promise<Player> {
    const jugador = this.jugadorRepository.create(createJugadorDto);
    return this.jugadorRepository.save(jugador);
  }

  async findAll(): Promise<Player[]> {
    return this.jugadorRepository.find();
  }

  async findOne(id: number): Promise<Player> {
    const jugador = await this.jugadorRepository.findOne({ where: { id } });
    if (!jugador) {
      throw new NotFoundException(`Jugador with ID ${id} not found`);
    }
    return jugador;
  }

  async update(
    id: number,
    updateJugadorDto: UpdateJugadorDto,
  ): Promise<Player> {
    await this.jugadorRepository.update(id, updateJugadorDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.jugadorRepository.softDelete(id);
  }
}
