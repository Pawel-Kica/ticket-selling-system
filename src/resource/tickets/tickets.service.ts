import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RouteMainSelect } from '../../@types/models/routes.types.dto';
import {
  TicketMainSelect,
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

  async findMany(where: TickerWhereDto, select = TicketMainSelect) {
    const tickets = await this.prisma.ticket.findMany({
      where,
      select,
    });
    return tickets;
  }

  async findFirst(where: TickerWhereDto) {
    const ticket = await this.prisma.ticket.findFirst({ where });
    return ticket;
  }
}
