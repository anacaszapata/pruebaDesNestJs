import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PrizeResult} from './prize-result.entity';  

@Entity()
export class Prize {
  @PrimaryGeneratedColumn('uuid')  
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @OneToMany(() => PrizeResult, (prizeResult) => prizeResult.prize)
  prizeResults: PrizeResult[];
  player: any;
}
