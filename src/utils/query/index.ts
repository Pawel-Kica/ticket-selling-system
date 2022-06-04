import { Transform } from 'class-transformer';
import { CarriageType, Position, Role, State, TrainType } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { toISOstring, ToNumber, ToString } from './transform';
import { IsEnum, IsString } from 'class-validator';

export class TrainsReportQuery {
  @ApiPropertyOptional()
  id: string;
  @Transform(({ value }) => toISOstring(value))
  @ApiPropertyOptional()
  departureTime: string;
}

export class TakeQuery {
  @ApiPropertyOptional()
  @Transform(({ value }) => ToNumber(value))
  take: number;
  @Transform(({ value }) => ToString(value))
  @ApiPropertyOptional()
  name: string;
}

export class IdDto {
  @IsString()
  id: string;
}
export class TrainsLookupQuery {
  @ApiPropertyOptional()
  routeId: string;
}
export class StationsLookupQuery {
  @ApiPropertyOptional()
  stationId: string;
}

export class RoutesLookupQuery extends TakeQuery {
  @ApiPropertyOptional()
  startStationId: string;
  @ApiPropertyOptional()
  endStationId: string;
  @ApiPropertyOptional()
  departureTime: string;
}

export class TicketsLookupQuery {
  @ApiPropertyOptional()
  userId: string;
  @ApiPropertyOptional()
  routeId: string;
  @ApiPropertyOptional()
  trainId: string;
  @ApiPropertyOptional()
  carriageId: string;
  @ApiPropertyOptional({ enum: State })
  state: State;
}

export class PricesLookupQuery extends TakeQuery {
  @ApiPropertyOptional()
  startStationId: string;
  @ApiPropertyOptional()
  endStationId: string;
  @ApiPropertyOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => ToNumber(value))
  priceLowerThan: number;
  @ApiPropertyOptional()
  @Transform(({ value }) => ToNumber(value))
  priceGreaterThan: number;
  @ApiPropertyOptional({ enum: CarriageType })
  carriageType: CarriageType;
  @ApiPropertyOptional({ enum: TrainType })
  trainType: TrainType;
}

export class EmployeesLookupQuery extends TakeQuery {
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  surname: string;
  @ApiPropertyOptional()
  telephoneNumber: string;
  @ApiPropertyOptional({ enum: Position })
  position: Position;
}

export class BossTrainsLookupQuery {
  @ApiPropertyOptional()
  bossId: string;
}

export class AdminUpdateUserRoleQuery {
  @IsString()
  id: string;
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}

export class LookupByRouteId {
  @ApiPropertyOptional()
  routeId: string;
}
