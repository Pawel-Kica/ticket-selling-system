import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Train, TrainType } from '@prisma/client';
import { Route } from '../../resource/dto/route/entities/route.entity';
// Types
import { CarriageInfoDto, carriageInfoSelect } from './carriage.types.dto';
import {
  StationEntity,
  StationsBetweenInfoDto,
  stationsBetweenSelect,
} from './stations.types.dto';

export type TrainWhereInput = Prisma.TrainWhereInput;
export type TrainWhereUniqueInput = Prisma.TrainWhereUniqueInput;
export type TrainSelect = Prisma.TrainSelect;

export class TrainEntity {
  id: Train['id'];
  routeId: Train['routeId'];
  bossId: Train['bossId'];
  driverId: Train['driverId'];
  driverHelperId: Train['driverHelperId'];
  @ApiProperty({ enum: TrainType })
  type: TrainType;
}

export class TrainRouteAndType {
  routeId: Train['routeId'];
  @ApiProperty({ enum: TrainType })
  type: TrainType;
}
export class TrainInfoDto {
  id: Train['id'];
  @ApiProperty({ enum: TrainType })
  type: TrainType;
  carriage: CarriageInfoDto[];
}

export const trainDetailsSelect = Prisma.validator<TrainSelect>()({
  id: true,
  type: true,
  carriage: {
    select: carriageInfoSelect,
  },
  route: {
    select: {
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
    },
  },
});

export class TrainDetailsDto extends TrainInfoDto {
  route: {
    id: Route['id'];
    startStation: StationEntity;
    departureTime: Route['departureTime'];
    endStation: StationEntity;
    arrivalTime: Route['arrivalTime'];
    stationsBetween: StationsBetweenInfoDto[];
  };
}
