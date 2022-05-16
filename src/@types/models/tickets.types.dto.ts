import { Prisma } from '@prisma/client';
import { CreateTicketDto } from '../../resource/dto/ticket/dto/create-ticket.dto';
import { RouteMainSelect } from './routes.types.dto';

export type CreateTicketPrismaDto = Prisma.TicketCreateInput;
export type TickerWhereDto = Prisma.TicketWhereInput;

export class CreateTicketExtendedDto extends CreateTicketDto {
  trainId: string;
  carriageId: string;
  startStationId: string;
  endStationId: string;
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
