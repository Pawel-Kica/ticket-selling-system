import { ApiPropertyOptional } from '@nestjs/swagger';
import { CarriageType, Prisma, TrainType } from '@prisma/client';

export type PricesWhereDto = Prisma.PriceWhereInput;

export class PricesLookupQuery {
  @ApiPropertyOptional()
  startStationId: string;
  @ApiPropertyOptional()
  endStationId: string;
  @ApiPropertyOptional({ enum: TrainType })
  trainType: TrainType;
  @ApiPropertyOptional({ enum: CarriageType })
  carriageType: CarriageType;
  @ApiPropertyOptional()
  priceLowerRange: number;
  @ApiPropertyOptional()
  priceUpperRange: number;
}
