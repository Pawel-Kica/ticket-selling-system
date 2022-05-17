import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  TicketMainSelect,
  CreateTicketPrismaDto,
  TicketWhereDto,
  ValidateAndCreateTicketDto,
  TicketSelectDto,
} from '../../@types/models/tickets.types.dto';
import { CarriagesService } from '../carriage/carriage.service';
import { PricesService } from '../prices/prices.service';
import { RoutesService } from '../routes/routes.service';
import { TrainsService } from '../trains/trains.service';

@Injectable()
export class TicketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly carriagesService: CarriagesService,
    private readonly trainsService: TrainsService,
    private readonly routesService: RoutesService,
    private readonly pricesService: PricesService,
  ) {}

  async create(data: CreateTicketPrismaDto) {
    return this.prisma.ticket.create({ data });
  }
  async findMany(
    where: TicketWhereDto,
    select: TicketSelectDto = TicketMainSelect,
  ) {
    return this.prisma.ticket.findMany({
      where,
      select,
    });
  }
  async findFirst(where: TicketWhereDto) {
    return this.prisma.ticket.findFirst({ where });
  }

  private async checkTicketAvailability({
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

  private async createWithParams({
    userId,
    trainId,
    carriageId,
    startStationId,
    endStationId,
    seat,
    state,
  }: ValidateAndCreateTicketDto) {
    return this.create({
      state,
      seat,
      user: {
        connect: {
          id: userId,
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

  async validateAndCreate({
    trainId,
    carriageId,
    startStationId,
    endStationId,
    userId,
    state,
    seat,
  }: ValidateAndCreateTicketDto) {
    const { type: carriageType } = await this.carriagesService.validateCarriage(
      {
        carriageId,
        trainId,
        seat,
      },
    );

    await this.checkTicketAvailability({ carriageId, seat });

    await this.routesService.validateRoute({
      startStationId,
      endStationId,
    });

    const { type: trainType } = await this.trainsService.findUnique({
      id: trainId,
    });

    await this.pricesService.checkPriceAvailability({
      carriageType,
      trainType,
      startStationId,
      endStationId,
    });

    return this.createWithParams({
      userId,
      trainId,
      state,
      carriageId,
      startStationId,
      endStationId,
      seat,
    });
  }
}
