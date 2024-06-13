import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player/entities/player.entity';
import { Result } from './result/entities/result.entity';
import { Torneo } from './torneo/entities/torneo.entity';
import { JugadorModule } from './player/jugador.module';
import { PrizeModule } from './prize/prize.module';

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
    PrizeModule,
    // TorneosModule,
    JugadorModule,
  ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
