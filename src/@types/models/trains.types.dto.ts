import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { RouteBasicSelect } from './routes.types.dto';

export type TrainWhereDto = Prisma.TrainWhereInput;
export type TrainWhereUniqueDto = Prisma.TrainWhereUniqueInput;
export type TrainSelectDto = Prisma.TrainSelect;

export const TrainBasicSelect = {
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
    select: RouteBasicSelect,
  },
};

export class TrainsLookupQuery {
  @ApiPropertyOptional()
  routeId: string;
}
