import { Prisma, Route, RoutePoint, Station } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export type RouteWhereDto = Prisma.RouteWhereInput;
export type RouteWhereUniqueDto = Prisma.RouteWhereUniqueInput;
export type RouteSelectDto = Prisma.RouteSelect;
export class RoutesLookupQuery {
  @ApiPropertyOptional()
  startStationId: string;
  @ApiPropertyOptional()
  endStationId: string;
  @ApiPropertyOptional()
  date: string;
}

export const RouteMainSelect = Prisma.validator<RouteSelectDto>()({
  id: true,
  startStation: {
    select: {
      name: true,
    },
  },
  departureTime: true,
  stationsBetween: {
    select: {
      station: {
        select: {
          name: true,
        },
      },
      departureTime: true,
      arrivalTime: true,
      order: true,
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
  train: {
    select: {
      type: true,
    },
  },
});

// how to avoid nestjs stupid validation
class _trainType {
  type: string;
}
class _stationsBetween {
  station: {
    name: Station['name'];
  };
  departureTime: RoutePoint['departureTime'];
  arrivalTime: RoutePoint['arrivalTime'];
  order: RoutePoint['order'];
}
export class RouteEntity {
  id: Route['id'];
  startStation: {
    name: Station['name'];
  };
  departureTime: Route['departureTime'];
  stationsBetween: _stationsBetween[];
  endStation: {
    name: Station['name'];
  };
  arrivalTime: Route['arrivalTime'];
  train: _trainType[];
}
