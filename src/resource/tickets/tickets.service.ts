import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RouteBasicSelect } from '../../@types/models/routes.types.dto';
import {
  CreateTicketPrismaDto,
  TickerWhereDto,
} from '../../@types/models/tickets.types.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTicketPrismaDto) {
    const ticket = await this.prisma.ticket.create({ data });
    return ticket;
  }

  async findMany(where: TickerWhereDto) {
    const tickets = await this.prisma.ticket.findMany({
      where,
      select: {
        seat: true,
        train: {
          select: {
            route: {
              select: RouteBasicSelect,
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
      },
    });
    return tickets;
  }

  async findFirst(where: TickerWhereDto) {
    const ticket = await this.prisma.ticket.findFirst({ where });
    return ticket;
  }
}
