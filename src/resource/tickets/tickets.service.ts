import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateTicketPrismaDto,
  TickerWhereDto,
} from '../../@types/models/tickets.types.dto';
import { UpdateTicketDto } from '../dto/ticket/dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTicketPrismaDto) {
    const ticket = await this.prisma.ticket.create({ data });
    return ticket;
  }

  findMany() {
    return `This action returns all tickets`;
  }
  async findFirst(where: TickerWhereDto) {
    const ticket = await this.prisma.ticket.findFirst({ where });
    return ticket;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
