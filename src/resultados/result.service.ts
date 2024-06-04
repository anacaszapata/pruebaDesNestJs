import { Injectable } from '@nestjs/common';
import { CreateResultadoDto } from '../resultados/dto/create-resultado.dto';
import { UpdateResultadoDto } from './dto/update-resultado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { JugadorService } from 'src/jugador/jugador.service';

@Injectable()
export class ResultadosService {
  constructor(
    @InjectRepository(Result)
    private readonly resultadoRepository: Repository<Result>,
    private readonly jugadorService: JugadorService,
  ) {}

  async create(createResultadoDto: CreateResultadoDto): Promise<Result> {
    const resultado = this.resultadoRepository.create(createResultadoDto);
    const savedResultado = await this.resultadoRepository.save(resultado);

    const ganador = await this.jugadorService.findOne(
      createResultadoDto.ganadorId,
    );
    const perdedor = await this.jugadorService.findOne(
      createResultadoDto.perdedorId,
    );

    ganador.puntaje = (ganador.puntaje || 0) + createResultadoDto.puntajeGanador;
    perdedor.puntaje = (perdedor.puntaje || 0) + createResultadoDto.puntajePerdedor;

    await this.jugadorService.update(ganador.id, { puntaje: ganador.puntaje });
    await this.jugadorService.update(perdedor.id, { puntaje: perdedor.puntaje });

    return savedResultado;
  }
  findAll() {
    return `This action returns all resultados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resultado`;
  }

  update(id: number, updateResultadoDto: UpdateResultadoDto) {
    return `This action updates a #${id} resultado`;
  }

  remove(id: number) {
    return `This action removes a #${id} resultado`;
  }
}
