import { Player } from 'src/jugador/entities/player.entity';
import { Result } from 'src/resultados/entities/result.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Torneo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  competencia: string;
  jugadores: Player[];
  resultados: Result[];
}
