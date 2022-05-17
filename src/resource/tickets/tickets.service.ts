import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  TicketMainSelect,
  CreateTicketPrismaDto,
  TickerWhereDto,
} from '../../@types/models/tickets.types.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTicketPrismaDto) {
    return this.prisma.ticket.create({ data });
  }
  async findMany(where: TickerWhereDto, select = TicketMainSelect) {
    return this.prisma.ticket.findMany({
      where,
      select,
    });
  }
  async findFirst(where: TickerWhereDto) {
    return this.prisma.ticket.findFirst({ where });
  }

  async checkTicketAvailability({
    carriageId,
    seat,
  }: {
    carriageId: string;
    seat: number;
  }) {
    const ticketAlreadyBought = await this.findFirst({
      carriageId,
      seat,
    });
    if (ticketAlreadyBought) throw new ConflictException();
  }

  async createWithParams({
    id,
    trainId,
    carriageId,
    startStationId,
    endStationId,
    seat,
  }: {
    id: string;
    trainId: string;
    carriageId: string;
    startStationId: string;
    endStationId: string;
    seat: number;
  }) {
    return this.create({
      seat,
      user: {
        connect: {
          id,
        },
      },
      train: {
        connect: {
          id: trainId,
        },
      },
      carriage: {
        connect: {
          id: carriageId,
        },
      },
      startStation: {
        connect: {
          id: startStationId,
        },
      },
      endStation: {
        connect: {
          id: endStationId,
        },
      },
    });
  }
}
