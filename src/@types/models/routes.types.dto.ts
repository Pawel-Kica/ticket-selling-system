import { TrainInfoDto } from './trains.types.dto';
import { Prisma, Route } from '@prisma/client';
import { carriageInfoSelect } from './carriage.types.dto';
import {
  StationEntity,
  StationsBetweenInfoDto,
  stationsBetweenSelect,
} from './stations.types.dto';

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
    select: stationsBetweenSelect,
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
  startStation: StationEntity;
  departureTime: Route['departureTime'];
  endStation: StationEntity;
  arrivalTime: Route['arrivalTime'];
  stationsBetween: StationsBetweenInfoDto[];
  train: TrainInfoDto[];
}
