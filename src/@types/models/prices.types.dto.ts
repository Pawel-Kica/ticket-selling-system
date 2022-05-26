import { ApiProperty } from '@nestjs/swagger';
import { CarriageType, Prisma, TrainType } from '@prisma/client';
import { Price } from './../../resource/dto/price/entities/price.entity';

export type PriceWhereInput = Prisma.PriceWhereInput;

export class PriceEntity {
  id: Price['id'];
  startStationId: Price['startStationId'];
  endStationId: Price['endStationId'];
  @ApiProperty({ enum: TrainType })
  trainType: Price['trainType'];
  @ApiProperty({ enum: CarriageType })
  carriageType: Price['carriageType'];
  value: Price['value'];
}
