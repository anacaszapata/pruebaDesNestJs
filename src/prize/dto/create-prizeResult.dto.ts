import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrizeDrawResultDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    description: 'The UUID of the player',
  })
  @IsUUID()
  @IsNotEmpty()
  playerId: string;

  @ApiProperty({
    example: 'z1x2c3v4-b5n6-m7l8-k9j0-h1g2f3d4s5a6',
    description: 'The UUID of the prize',
  })
  @IsUUID()
  @IsNotEmpty()
  prizeId: string;
}
