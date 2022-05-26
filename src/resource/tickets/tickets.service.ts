// Nest
import { PrismaService } from 'nestjs-prisma';
import { ConflictException, Injectable } from '@nestjs/common';
// Types
import { State } from '@prisma/client';
import {
  CreateTicketPrisma,
  TicketWhere,
  CreateTicketParams,
  ticketMainSelect,
  ticketUserSelect,
} from '../../@types/models/tickets.types.dto';
// Services
import { PricesService } from '../prices/prices.service';
import { RoutesService } from '../routes/routes.service';
import { TrainsService } from '../trains/trains.service';
import { gtBookTimeLimit } from '../../config/dates.config';
import { CarriagesService } from '../carriage/carriage.service';
import { BookOnlyBefore3DaysException } from '../../utils/responses/errors';

@Injectable()
export class TicketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly trainsService: TrainsService,
    private readonly routesService: RoutesService,
    private readonly pricesService: PricesService,
    private readonly carriagesService: CarriagesService,
  ) {}

  async create(data: CreateTicketPrisma) {
    return this.prisma.ticket.create({ data });
  }
  async findManyIncludeUsers(where?: TicketWhere) {
    return this.prisma.ticket.findMany({
      where,
      select: ticketUserSelect,
    });
  }
  async findManyIncludeTrains(where?: TicketWhere) {
    return this.prisma.ticket.findMany({ where, select: ticketMainSelect });
  }
  async findFirst(where: TicketWhere) {
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
  }: CreateTicketParams) {
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
  }: CreateTicketParams) {
    const { type: carriageType } = await this.carriagesService.validateCarriage(
      {
        carriageId,
        trainId,
        seat,
      },
    );

    await this.checkTicketAvailability({ carriageId, seat });

    const route = await this.routesService.validateRoute({
      startStationId,
      endStationId,
    });

    if (route.departureTime < gtBookTimeLimit && state === State.booked)
      throw new BookOnlyBefore3DaysException();

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
