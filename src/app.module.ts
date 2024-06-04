import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './jugador/entities/player.entity';
import { Result } from './resultados/entities/result.entity';
import { Torneo } from './torneo/entities/torneo.entity';
import { TorneosModule } from './torneo/torneos.module';
import { JugadorModule } from './jugador/jugador.module';
import { CompetenciasModule } from './competencias/competencias.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Player, Result, Torneo],
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    CompetenciasModule,
    // TorneosModule,
    // JugadorModule,
  ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
