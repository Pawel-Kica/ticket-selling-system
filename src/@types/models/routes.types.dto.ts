import { Prisma, Route, Station } from '@prisma/client';
import {
  carriageInfoSelect,
  _stationsBetweenInfoDto,
  _trainInfoDto,
} from './helpers.dto';

export type RouteWhereInput = Prisma.RouteWhereInput;
export type RouteWhereUniqueInput = Prisma.RouteWhereUniqueInput;
export type RouteSelect = Prisma.RouteSelect;

export const routeMainSelect = Prisma.validator<RouteSelect>()({
  id: true,
  startStation: true,
  departureTime: true,
  endStation: true,
  arrivalTime: true,
  stationsBetween: {
    select: {
      station: true,
      departureTime: true,
      arrivalTime: true,
      order: true,
    },
    orderBy: {
      order: 'asc',
    },
  },
  train: {
    select: {
      id: true,
      type: true,
      carriage: {
        select: carriageInfoSelect,
      },
    },
  },
});

export class RouteEntity {
  id: Route['id'];
  startStation: {
    id: Station['id'];
    name: Station['name'];
  };
  departureTime: Date;
  endStation: {
    id: Station['id'];
    name: Station['name'];
  };
  arrivalTime: Date;
  stationsBetween: _stationsBetweenInfoDto[];
  train: _trainInfoDto[];
}
