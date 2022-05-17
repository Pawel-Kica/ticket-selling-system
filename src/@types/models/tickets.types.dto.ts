import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma, State } from '@prisma/client';
import { CreateTicketDto } from '../../resource/dto/ticket/dto/create-ticket.dto';
import { RouteMainSelect } from './routes.types.dto';

export type CreateTicketPrismaDto = Prisma.TicketCreateInput;
export type TicketWhereDto = Prisma.TicketWhereInput;
export type TicketSelectDto = Prisma.TicketSelect;

export class CreateTicketExtendedDto extends CreateTicketDto {
  trainId: string;
  carriageId: string;
  startStationId: string;
  endStationId: string;
}
export class ValidateAndCreateTicketDto extends CreateTicketExtendedDto {
  userId: string;
  @ApiProperty({ enum: State })
  state?: State;
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

export const TicketMainSelect = {
  seat: true,
  train: {
    select: {
      route: {
        select: RouteMainSelect,
      },
    },
  },
  startStation: {
    select: {
      name: true,
    },
  },
  endStation: {
    select: {
      name: true,
    },
  },
  carriage: {
    select: {
      id: true,
      type: true,
      numberOfSeats: true,
    },
  },
  state: true,
  timeOfOperation: true,
};
