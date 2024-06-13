import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Prize } from 'src/prize/entities/prize.entity';

@Entity()
export class Player {
  
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the player',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Ana Sofia', description: 'The name of the player' })
  @Column()
  name: string;

  @ApiProperty({
    example: '1200',
    description: 'The score of the player',
  })
  @Column({ nullable: true })
  score: number;

  @OneToMany(() => Prize, prize => prize.player)
  prize: Prize[];
    prizeResults: any;
}
