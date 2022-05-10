import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { toNumber } from './../../utils/query/transform';

export type PricesWhereDto = Prisma.PriceWhereInput;

export class PricesLookupQuery {
  @Transform(({ value }) => toNumber(value))
  @ApiPropertyOptional()
  startStationId: number;
}
