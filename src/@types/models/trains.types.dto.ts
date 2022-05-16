import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { RouteMainSelect } from './routes.types.dto';

export type TrainWhereDto = Prisma.TrainWhereInput;
export type TrainWhereUniqueDto = Prisma.TrainWhereUniqueInput;
export type TrainSelectDto = Prisma.TrainSelect;

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

export class TrainsLookupQuery {
  @ApiPropertyOptional()
  routeId: string;
}
