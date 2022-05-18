import { Prisma, State, Station, Ticket } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// dto
import { RouteMainSelect } from './routes.types.dto';
import { CreateTicketDto } from '../../resource/dto/ticket/dto/create-ticket.dto';

export type CreateTicketPrismaDto = Prisma.TicketCreateInput;
export type TicketWhereDto = Prisma.TicketWhereInput;
export type TicketSelectDto = Prisma.TicketSelect;

export class CreateTicketExtDto extends CreateTicketDto {
  trainId: Ticket['trainId'];
  carriageId: Ticket['carriageId'];
  startStationId: Ticket['startStationId'];
  endStationId: Ticket['endStationId'];
}
export class ValidateAndCreateTicketDto extends CreateTicketExtDto {
  userId: Ticket['userId'];
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
export class CreateTicketResponseDto {
  id: Ticket['id'];
  seat: Ticket['seat'];
  userId: Ticket['userId'];
  trainId: Ticket['trainId'];
  carriageId: Ticket['carriageId'];
  startStationId: Ticket['startStationId'];
  endStationId: Ticket['endStationId'];
  state: State = State.bought;
  timeOfOperation: Ticket['timeOfOperation'];
}

export class CreateTicketByManagerResponseDto extends CreateTicketResponseDto {
  @ApiProperty({ enum: State })
  state: State;
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

export const TicketUserSelect = {
  user: {
    select: {
      id: true,
      name: true,
      surname: true,
    },
  },
  trainId: true,
  carriage: {
    select: {
      id: true,
      type: true,
    },
  },
  state: true,
  seat: true,
  startStation: true,
  endStation: true,
  timeOfOperation: true,
};
