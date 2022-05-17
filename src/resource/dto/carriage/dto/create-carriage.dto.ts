import { CarriageType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarriageDto {
  numberOfSeats: number;
  @ApiProperty({ enum: CarriageType })
  type: CarriageType;
}
