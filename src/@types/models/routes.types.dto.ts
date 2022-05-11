import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export type RouteWhereDto = Prisma.RouteWhereInput;

export class RoutesLookupQuery {
  @ApiPropertyOptional()
  startStationId: string;
  @ApiPropertyOptional()
  endStationId: string;
  @ApiPropertyOptional()
  date: string;
}
