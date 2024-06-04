import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JugadorService } from './jugador.service';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Players')
@Controller('jugadores')
export class JugadorController {
  constructor(private readonly jugadorService: JugadorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new player' })
  @ApiResponse({ status: 201, description: 'The player has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createJugadorDto: CreateJugadorDto) {
    return this.jugadorService.create(createJugadorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of all players.' })
  findAll() {
    return this.jugadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jugadorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a player' })
  @ApiParam({ name: 'id', description: 'The id of the hero to update' })
  @ApiResponse({
    status: 200,
    description: 'The player has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'player not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  update(@Param('id') id: string, @Body() updateJugadorDto: UpdateJugadorDto) {
    return this.jugadorService.update(+id, updateJugadorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a player' })
  @ApiParam({ name: 'id', description: 'The id of the player to delete' })
  @ApiResponse({
    status: 200,
    description: 'The player has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  remove(@Param('id') id: string) {
    return this.jugadorService.remove(+id);
  }
}
