import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Torneo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  competencia: string;

  @ManyToMany(() => Jugador)
  @JoinTable()
  jugadores: Jugador[];

  @OneToMany(() => Resultado, resultado => resultado.torneo)
  resultados: Resultado[];
}