import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ResultadosService } from './result.service';
import { UpdateResultadoDto } from './dto/update-resultado.dto';
import { CreateResultDto } from './dto/create-resultado.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Results')
@Controller('resultados')
export class ResultadosController {
  constructor(private readonly resultadosService: ResultadosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new result' })
  @ApiResponse({
    status: 201,
    description: 'The result has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createResult(@Body() createResultDto: CreateResultDto) {
    try {
      const result = await this.resultadosService.createResult(createResultDto);
      return { result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all results' })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of all results.',
  })
  findAll() {
    return this.resultadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultadosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultadoDto: UpdateResultadoDto) {
    return this.resultadosService.update(+id, updateResultadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultadosService.remove(+id);
  }
}
