import { Prisma, Route, RoutePoint, Station } from '@prisma/client';

export type CreateStationInput = Prisma.StationCreateInput;
export type StationsWhereInput = Prisma.StationWhereInput;
export type StationWhereUniqueInput = Prisma.StationWhereUniqueInput;
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
export class StationRouteDto {
  id: Station['id'];
  startStation: StationEntity;
  departureTime: Route['departureTime'];
  endStation: StationEntity;
  arrivalTime: Route['arrivalTime'];
}

export class StationsBetweenRouteDto {
  routeId: Route['id'];
  departureTime: RoutePoint['departureTime'];
  arrivalTime: RoutePoint['arrivalTime'];
  order: RoutePoint['order'];
  route: {
    startStation: StationEntity;
    departureTime: Route['departureTime'];
    endStation: StationEntity;
    arrivalTime: Route['arrivalTime'];
  };
}
export class StationDetailedInfoDto {
  id: Station['id'];
  name: Station['name'];
  routeStartStations: StationRouteDto[];
  routeEndStations: StationRouteDto[];
  routeStationsBetween: StationsBetweenRouteDto[];
}

// select: {
//   id: true,
//   name: true,
//   routeStartStations: {
//     select: {
//       id: true,
//       startStation: true,
//       departureTime: true,
//       endStation: true,
//       arrivalTime: true,
//     },
//   },
//   routeEndStations: {
//     select: {
//       id: true,
//       startStation: true,
//       departureTime: true,
//       endStation: true,
//       arrivalTime: true,
//     },
//   },
//   routeStationsBetween: {
//     select: {
//       routeId: true,
//       departureTime: true,
//       arrivalTime: true,
//       order: true,
//       route: {
//         select: {
//           startStation: true,
//           departureTime: true,
//           endStation: true,
//           arrivalTime: true,
//         },
//       },
//     },
//   },
