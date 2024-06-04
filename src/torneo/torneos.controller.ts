import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TorneosService } from '../torneo/torneos.service';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { ApiKeyGuard } from '../guard/apikey.guard';

@Controller('torneos')
export class TorneoController {
  constructor(private readonly torneoService: TorneosService) {}

  @UseGuards(ApiKeyGuard)
  @Post()
  create(@Body() createTorneoDto: CreateTorneoDto) {
    return this.torneoService.create(createTorneoDto);
  }

  @Get()
  findAll() {
    return this.torneoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.torneoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTorneoDto: UpdateTorneoDto) {
    return this.torneoService.update(+id, updateTorneoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.torneoService.remove(+id);
  }
}
