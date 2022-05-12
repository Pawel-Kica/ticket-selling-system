import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export type RouteWhereDto = Prisma.RouteWhereInput;
export type RouteWhereUniqueInput = Prisma.RouteWhereUniqueInput;
export type RouteSelectDto = Prisma.RouteSelect;

export const RouteBasicSelect = {
  departureTime: true,
  arrivalTime: true,
  startStation: true,
  stationsBetween: true,
  endStation: true,
};

export class RoutesLookupQuery {
  @ApiPropertyOptional()
  startStationId: string;
  @ApiPropertyOptional()
  endStationId: string;
  @ApiPropertyOptional()
  date: string;
}
