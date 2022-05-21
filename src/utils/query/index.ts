import { State } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

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
