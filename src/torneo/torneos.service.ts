import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Torneo } from './entities/torneo.entity';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { Player } from '../jugador/entities/player.entity';
import { Result } from '../resultados/entities/result.entity';

@Injectable()
export class TorneoService {
  constructor(
    @InjectRepository(Torneo)
    private readonly torneoRepository: Repository<Torneo>,
    @InjectRepository(Player)
    private readonly jugadorRepository: Repository<Player>,
    @InjectRepository(Result)
    private readonly resultadoRepository: Repository<Result>,
  ) {}

  async create(createTorneoDto: CreateTorneoDto): Promise<Torneo> {
    const torneo = this.torneoRepository.create(createTorneoDto);
    if (createTorneoDto.jugadoresIds) {
      torneo.jugadores = await this.jugadorRepository.findByIds(
        createTorneoDto.jugadoresIds,
      );
    }
    return this.torneoRepository.save(torneo);
  }

  findAll(): Promise<Torneo[]> {
    return this.torneoRepository.find({
      relations: ['jugadores', 'resultados'],
    });
  }

  async findOne(id: number): Promise<Torneo> {
    const torneo = await this.torneoRepository.findOne({where:{id}});

    if (!torneo) {
      throw new Error(`No se encontró ningún torneo con el ID ${id}`);
    }
    return torneo;
  }

  async update(id: number, updateTorneoDto: UpdateTorneoDto): Promise<Torneo> {
    const torneo = await this.torneoRepository.findOne({ where: { id } });

    if (updateTorneoDto.jugadoresIds) {
      torneo.jugadores = await this.jugadorRepository.findByIds(
        updateTorneoDto.jugadoresIds,
      );
    }
    if (updateTorneoDto.resultadosIds) {
      torneo.resultados = await this.resultadoRepository.findByIds(
        updateTorneoDto.resultadosIds,
      );
    }
    Object.assign(torneo, updateTorneoDto);
    return this.torneoRepository.save(torneo);
  }

  async remove(id: number): Promise<void> {
    await this.torneoRepository.softDelete(id);
  }
}
