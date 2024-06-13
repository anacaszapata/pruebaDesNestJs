// result.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Player } from '../../player/entities/player.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the result',
  })
  id: number;

  @ApiProperty({
    example: 1200,
    description: 'The score when the torneum finish',
  })
  @Column()
  score: number;
}
