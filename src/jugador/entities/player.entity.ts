import { ApiProperty } from '@nestjs/swagger';
import { Result } from '../../resultados/entities/result.entity';
import { Torneo } from 'src/torneo/entities/torneo.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Player {
  
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the player',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ana Sofia', description: 'The name of the player' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Spider-like abilities',
    description: 'The score of the player',
  })
  @Column({ nullable: true })
  score: number;
}
