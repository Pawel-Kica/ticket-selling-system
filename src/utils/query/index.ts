import { CarriageType, Position, Role, State, TrainType } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ToNumber } from './transform';
import { IsEnum, IsString } from 'class-validator';

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

export class RoutesLookupQuery extends TakeQuery {
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
