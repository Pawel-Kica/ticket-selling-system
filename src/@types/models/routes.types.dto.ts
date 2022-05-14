import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export type RouteWhereDto = Prisma.RouteWhereInput;
export type RouteWhereUniqueInput = Prisma.RouteWhereUniqueInput;
export type RouteSelectDto = Prisma.RouteSelect;

export const RouteBasicSelect: RouteSelectDto = {
  departureTime: true,
  arrivalTime: true,
  startStation: true,
  stationsBetween: {
    select: {
      order: true,
      station: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  },
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
