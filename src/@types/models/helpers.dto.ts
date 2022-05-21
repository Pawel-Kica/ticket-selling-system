import {
  Carriage,
  CarriageType,
  RoutePoint,
  Station,
  Train,
  TrainType,
} from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export const carriageInfoSelect = {
  id: true,
  numberOfSeats: true,
  type: true,
  _count: true,
};

export class _carriageInfoDto {
  id: Carriage['id'];
  numberOfSeats: Carriage['numberOfSeats'];
  @ApiProperty({ enum: CarriageType })
  type: CarriageType;
  _count: {
    ticket: number;
  };
}

export class _trainInfoDto {
  id: Train['id'];
  @ApiProperty({ enum: TrainType })
  type: TrainType;
  carriage: _carriageInfoDto[];
}

export class _stationsBetweenInfoDto {
  station: {
    id: Station['id'];
    name: Station['name'];
  };
  departureTime: Date;
  arrivalTime: Date;
  order: RoutePoint['order'];
}
