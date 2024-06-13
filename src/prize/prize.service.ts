import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Player } from '../player/entities/player.entity';
import { Prize } from './entities/prize.entity';
import { PrizeResult } from './entities/prize-result.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment-timezone';
import { CreatePrizeDto } from './dto/create-prize.dto';

@Injectable()
export class PrizeService {
  constructor(
    @InjectRepository(Prize)
    private prizeRepository: Repository<Prize>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(PrizeResult)
    private prizeDrawResultRepository: Repository<PrizeResult>,
  ) {}

  async createPrize(createPrizeDto: CreatePrizeDto): Promise<Prize> {
    const prize = this.prizeRepository.create(createPrizeDto);
    return this.prizeRepository.save(prize);
  }

  async assignPrizeToPlayer(playerId: string): Promise<PrizeResult> {
    const player = await this.playerRepository.findOne({ where: { id: playerId }, relations: ['prizeResults'] });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    const today = moment().tz('America/Bogota').startOf('day');

    const hasClaimedToday = player.prizeResults.some(
      (result) => moment(result.createdAt).tz('America/Bogota').isSame(today, 'day')
    );

    if (hasClaimedToday) {
      throw new BadRequestException('Player has already claimed a prize today');
    }

    const availablePrizes = await this.prizeRepository.find({ where: { quantity: MoreThan(0) } });

    if (availablePrizes.length === 0) {
      throw new BadRequestException('No prizes available');
    }

    const randomIndex = Math.floor(Math.random() * availablePrizes.length);
    const randomPrize = availablePrizes[randomIndex];

    await this.prizeRepository.manager.transaction(async transactionalEntityManager => {
      randomPrize.quantity -= 1;
      if (randomPrize.quantity === 0) {
        await transactionalEntityManager.remove(randomPrize);
      } else {
        await transactionalEntityManager.save(randomPrize);
      }

      const prizeDrawResult = this.prizeDrawResultRepository.create({
        player,
        prize: randomPrize,
        createdAt: new Date(),
      });

      await transactionalEntityManager.save(prizeDrawResult);
    });

    const prizeDrawResult = this.prizeDrawResultRepository.create({
      player,
      prize: randomPrize,
    });

    return this.prizeDrawResultRepository.save(prizeDrawResult);
  }

  @Cron(CronExpression.EVERY_DAY_AT_11PM, { timeZone: 'America/Bogota' })
  async assignUnclaimedPrizes() {
    const today = moment().tz('America/Bogota').startOf('day');

    const players = await this.playerRepository
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.prizeResults', 'prizeDrawResult')
      .getMany();

    for (const player of players) {
      const hasClaimedToday = player.prizeResults.some(
        (result) => moment(result.createdAt).tz('America/Bogota').isSame(today, 'day')
      );

      if (!hasClaimedToday) {
        try {
          await this.assignPrizeToPlayer(player.id);
        } catch (error) {
          console.error(`Failed to assign prize to player ${player.id}:`, error);
        }
      }
    }
  }
}
