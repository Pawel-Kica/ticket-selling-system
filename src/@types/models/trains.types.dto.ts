import { Prisma, Train, TrainType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
// Types
import { carriageInfoSelect, _trainInfoDto } from './helpers.dto';
import { RouteEntity, routeMainSelect } from './routes.types.dto';

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

export const trainDetailsSelect = {
  id: true,
  type: true,
  routeId: true,
  carriage: {
    select: carriageInfoSelect,
  },
  route: {
    select: routeMainSelect,
  },
};
export class TrainDetailsDto extends _trainInfoDto {
  routeId: Train['routeId'];
  route: RouteEntity;
}
