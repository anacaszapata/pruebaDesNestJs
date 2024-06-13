import { Player } from 'src/player/entities/player.entity';
import { Result } from 'src/result/entities/result.entity';
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
