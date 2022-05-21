import { Prisma, RoutePoint, Station } from '@prisma/client';

export type CreateStationInput = Prisma.StationCreateInput;
export type StationsWhereInput = Prisma.StationWhereInput;
export type StationsSelect = Prisma.StationSelect;

export class StationEntity {
  id: Station['id'];
  name: Station['name'];
}

export const stationsBetweenSelect = {
  station: true,
  departureTime: true,
  arrivalTime: true,
  order: true,
};
export class StationsBetweenInfoDto {
  station: StationEntity;
  departureTime: RoutePoint['departureTime'];
  arrivalTime: RoutePoint['arrivalTime'];
  order: RoutePoint['order'];
}
