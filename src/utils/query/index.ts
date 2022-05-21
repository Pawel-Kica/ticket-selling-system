import { CarriageType, State, TrainType } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ToNumber } from './transform';

export class TakeQuery {
  @ApiPropertyOptional()
  @Transform(({ value }) => ToNumber(value))
  take: number;
}
export class TrainsLookupQuery {
  @ApiPropertyOptional()
  routeId: string;
}
export class StationsLookupQuery {
  @ApiPropertyOptional()
  stationId: string;
}

export class RoutesLookupQuery {
  @ApiPropertyOptional()
  startStationId: string;
  @ApiPropertyOptional()
  endStationId: string;
  @ApiPropertyOptional()
  date: string;
}

export class TicketsLookupQuery {
  @ApiPropertyOptional()
  userId: string;
  @ApiPropertyOptional()
  trainId: string;
  @ApiPropertyOptional()
  carriageId: string;
  @ApiPropertyOptional({ enum: State })
  state: State;
  @ApiPropertyOptional()
  routeId: string;
}

export class PricesLookupQuery extends TakeQuery {
  @ApiPropertyOptional()
  startStationId: string;
  @ApiPropertyOptional()
  endStationId: string;
  @ApiPropertyOptional({ enum: CarriageType })
  carriageType: CarriageType;
  @ApiPropertyOptional({ enum: TrainType })
  trainType: TrainType;
}

export class EmployeesLookupQuery extends TakeQuery {}
