import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Torneo } from './entities/torneo.entity';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { Jugador } from '../jugador/entities/jugador.entity';
import { Resultado } from '../resultados/entities/result.entity';

@Injectable()
export class TorneoService {
  constructor(
    @InjectRepository(Torneo)
    private readonly torneoRepository: Repository<Torneo>,
    @InjectRepository(Jugador)
    private readonly jugadorRepository: Repository<Jugador>,
    @InjectRepository(Resultado)
    private readonly resultadoRepository: Repository<Resultado>,
  ) {}

  async create(createTorneoDto: CreateTorneoDto): Promise<Torneo> {
    const torneo = this.torneoRepository.create(createTorneoDto);
    if (createTorneoDto.jugadoresIds) {
      torneo.jugadores = await this.jugadorRepository.findByIds(createTorneoDto.jugadoresIds);
    }
    return this.torneoRepository.save(torneo);
  }

  findAll(): Promise<Torneo[]> {
    return this.torneoRepository.find({ relations: ['jugadores', 'resultados'] });
  }

  findOne(id: number): Promise<Torneo> {
    return this.torneoRepository.findOne(id, { relations: ['jugadores', 'resultados'] });
  }

  async update(id: number, updateTorneoDto: UpdateTorneoDto): Promise<Torneo> {
    const torneo = await this.torneoRepository.findOne(id, { relations: ['jugadores', 'resultados'] });
    if (updateTorneoDto.jugadoresIds) {
      torneo.jugadores = await this.jugadorRepository.findByIds(updateTorneoDto.jugadoresIds);
    }
    if (updateTorneoDto.resultadosIds) {
      torneo.resultados = await this.resultadoRepository.findByIds(updateTorneoDto.resultadosIds);
    }
    Object.assign(torneo, updateTorneoDto);
    return this.torneoRepository.save(torneo);
  }

  async remove(id: number): Promise<void> {
    await this.torneoRepository.softDelete(id);
  }
}
