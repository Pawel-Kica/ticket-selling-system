import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export type RouteWhereDto = Prisma.RouteWhereInput;
export type RouteWhereUniqueInput = Prisma.RouteWhereUniqueInput;
export type RouteSelectDto = Prisma.RouteSelect;

export const RouteMainSelect: RouteSelectDto = {
  startStation: {
    select: {
      name: true,
    },
  },
  departureTime: true,
  stationsBetween: {
    select: {
      departureTime: true,
      arrivalTime: true,
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
  endStation: {
    select: {
      name: true,
    },
  },
  arrivalTime: true,
};

export class RoutesLookupQuery {
  @ApiPropertyOptional()
  startStationId: string;
  @ApiPropertyOptional()
  endStationId: string;
  @ApiPropertyOptional()
  date: string;
}
