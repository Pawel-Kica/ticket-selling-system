import { Prisma, Station } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export type CreateStationDto = Prisma.StationCreateInput;
export type StationsWhereDto = Prisma.StationWhereInput;
export type StationsSelectDto = Prisma.StationSelect;

export class StationsLookupQuery {
  @ApiPropertyOptional()
  stationId: string;
}

export class StationEntity {
  id: Station['id'];
  name: Station['name'];
}
