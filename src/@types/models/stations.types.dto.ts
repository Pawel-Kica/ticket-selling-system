import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export type CreateStationDto = Prisma.StationCreateInput;
export type StationsWhereDto = Prisma.StationWhereInput;
export type StationsSelectDto = Prisma.StationSelect;

export class StationsLookupQuery {
  @ApiPropertyOptional()
  stationId: string;
}
