import { Prisma } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';
// dto
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
