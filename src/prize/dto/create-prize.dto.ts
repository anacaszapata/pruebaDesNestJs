import { ApiProperty } from '@nestjs/swagger';

export class CreatePrizeDto {
  @ApiProperty({ example: 'Gaming Mouse', description: 'The name of the prize' })
  name: string;

  @ApiProperty({ example: 10, description: 'The quantity of the prize available' })
  quantity: number;
}
