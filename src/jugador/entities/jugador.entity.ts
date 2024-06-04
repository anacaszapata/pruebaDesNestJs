import { Resultado } from "src/resultados/entities/resultado.entity";
import { Torneo } from "src/torneo/entities/torneo.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Jugador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  puntaje: number;

  @ManyToMany(() => Torneo, (torneo) => torneo.jugadores)
  torneos: Torneo[];

  @OneToMany(() => Resultado, (resultado) => resultado.ganador)
  resultadosGanados: Resultado[];

  @OneToMany(() => Resultado, resultado => resultado.perdedor)
  resultadosPerdidos: Resultado[];
}