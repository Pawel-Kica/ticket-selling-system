import {
  Carriage,
  CarriageType,
  Prisma,
  State,
  Station,
  Ticket,
  Train,
  User,
} from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
// Types
import { StationEntity } from './stations.types.dto';
import { TrainRouteAndType } from './trains.types.dto';
import { CarriageSeatsDto } from './carriage.types.dto';
import { CreateTicketDto } from '../../resource/dto/ticket/dto/create-ticket.dto';

export type CreateTicketPrisma = Prisma.TicketCreateInput;
export type TicketWhere = Prisma.TicketWhereInput;
export type TicketSelect = Prisma.TicketSelect;

export class CreateTicketBody extends CreateTicketDto {
  trainId: Ticket['trainId'];
  carriageId: Ticket['carriageId'];
  startStationId: Ticket['startStationId'];
  endStationId: Ticket['endStationId'];
}
export class CreateTicketParams extends CreateTicketBody {
  userId: Ticket['userId'];
  @ApiProperty({ enum: State })
  state?: State;
}
export class CreateTicketResponse {
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
export class CreateTicketByManagerResponse extends CreateTicketResponse {
  @ApiProperty({ enum: State })
  state: State;
}

export const ticketMainSelect = Prisma.validator<TicketSelect>()({
  id: true,
  seat: true,
  train: {
    select: {
      routeId: true,
      type: true,
    },
  },
  startStation: true,
  endStation: true,
  carriage: {
    select: {
      id: true,
      type: true,
      numberOfSeats: true,
    },
  },
  state: true,
  timeOfOperation: true,
});

export class TicketEntity {
  id: Ticket['id'];
  seat: Ticket['seat'];
  train: TrainRouteAndType;
  startStation: StationEntity;
  endStation: StationEntity;
  carriage: CarriageSeatsDto;
  @ApiProperty({ enum: State })
  state: State;
  timeOfOperation: Ticket['timeOfOperation'];
}

export const ticketUserSelect = Prisma.validator<TicketSelect>()({
  state: true,
  seat: true,
  startStation: true,
  endStation: true,
  user: {
    select: {
      id: true,
      name: true,
      surname: true,
    },
  },
  carriage: {
    select: {
      id: true,
      type: true,
      numberOfSeats: true,
    },
  },
  trainId: true,
  timeOfOperation: true,
});

export class TicketUserSelectEntity {
  user: {
    id: User['id'];
    name: User['name'];
    surname: User['surname'];
  };
  trainId: Train['id'];
  carriage: CarriageSeatsDto;
  timeOfOperation: Ticket['timeOfOperation'];
  @ApiProperty({ enum: State })
  state: State;
  startStation: {
    id: Station['id'];
    name: Station['name'];
  };
  endStation: {
    id: Station['id'];
    name: Station['name'];
  };
}
