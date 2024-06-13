import { Controller, Post, Param, Body, Get, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PrizeService } from './prize.service';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { Prize } from './entities/prize.entity';
import { PrizeDrawResult } from './entities/prizeDrawResult.entity';

@ApiTags('prizes')
@Controller('prizes')
export class PrizeController {
  constructor(private readonly prizeService: PrizeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new prize' })
  @ApiBody({ type: CreatePrizeDto })
  @ApiResponse({ status: 201, description: 'The prize has been successfully created.', type: Prize })
  async createPrize(@Body() createPrizeDto: CreatePrizeDto): Promise<Prize> {
    return this.prizeService.createPrize(createPrizeDto);
  }

  @Post(':playerId/claim')
  @ApiOperation({ summary: 'Claim a daily prize for a player' })
  @ApiParam({ name: 'playerId', description: 'The ID of the player' })
  @ApiResponse({ status: 201, description: 'The prize has been successfully assigned to the player.', type: PrizeDrawResult })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  @ApiResponse({ status: 400, description: 'Player has already claimed a prize today or no prizes available.' })
  async assignPrizeToPlayer(@Param('playerId') playerId: string): Promise<PrizeDrawResult> {
    try {
      return await this.prizeService.assignPrizeToPlayer(playerId);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(' error occurred.');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all prizes' })
  @ApiResponse({ status: 200, description: 'List of all prizes.', type: [Prize] })
  async getAllPrizes(): Promise<Prize[]> {
    return this.prizeService.getAllPrizes();
  }
}
