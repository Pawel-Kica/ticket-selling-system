import { Prisma, Train, TrainType } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// Types
import { RouteMainSelect } from './routes.types.dto';

export type TrainWhereDto = Prisma.TrainWhereInput;
export type TrainWhereUniqueDto = Prisma.TrainWhereUniqueInput;
export type TrainSelectDto = Prisma.TrainSelect;

export class TrainsLookupQuery {
  @ApiPropertyOptional()
  routeId: string;
}

export const TrainMainSelect = {
  id: true,
  type: true,
  routeId: true,
  carriage: {
    select: {
      numberOfSeats: true,
      type: true,
      _count: true,
    },
  },
  route: {
    select: RouteMainSelect,
  },
};

export class TrainEntity {
  id: Train['id'];
  routeId: Train['routeId'];
  bossId: Train['bossId'];
  driverId: Train['driverId'];
  driverHelperId: Train['driverHelperId'];
  @ApiProperty({ enum: TrainType })
  type: TrainType;
}
