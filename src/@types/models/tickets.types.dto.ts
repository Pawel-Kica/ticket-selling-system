import {
  Carriage,
  CarriageType,
  Prisma,
  State,
  Station,
  Train,
  User,
} from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// Types
import { RouteEntity, RouteMainSelect } from './routes.types.dto';
import { Ticket } from '../../resource/dto/ticket/entities/ticket.entity';
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

export class CreateTicketByManagerResponse extends CreateTicketResponse {
  @ApiProperty({ enum: State })
  state: State;
}

export const ticketMainSelect = Prisma.validator<TicketSelect>()({
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
});

export class TicketEntity {
  seat: Ticket['seat'];
  train: {
    route: RouteEntity;
  };
  startStation: {
    name: Station['name'];
  };
  endStation: {
    name: Station['name'];
  };
  carriage: {
    id: Carriage['id'];
    type: Carriage['type'];
    numberOfSeats: Carriage['numberOfSeats'];
  };
  state: Ticket['state'];
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
  carriage: {
    id: Carriage['id'];
    // @ApiProperty({ enum: State })
    type: CarriageType;
  };
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
