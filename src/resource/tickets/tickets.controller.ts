import * as moment from 'moment';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  ConflictException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTicketExtendedDto } from '../../@types/models/tickets.types.dto';
import { UserId } from '../../decorators/user.decorator';
import { RequireUser } from '../../guards/requireUser';
import { InvalidRequestedBody } from '../../utils/responses/errors';
import { CarriagesService } from '../carriage/carriage.service';
import { RoutesService } from '../routes/routes.service';
import { TrainsService } from '../trains/trains.service';
import { TicketsService } from './tickets.service';
import { PricesService } from '../prices/prices.service';
import { CarriageType } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly carriagesService: CarriagesService,
    private readonly trainsService: TrainsService,
    private readonly routesService: RoutesService,
    private readonly pricesService: PricesService,
  ) {}

  @Post()
  @UseGuards(RequireUser)
  async create(
    @Body()
    {
      seat,
      startStationId,
      endStationId,
      carriageId,
      trainId,
    }: CreateTicketExtendedDto,
    @UserId() id: string,
  ) {
    const { trainId: carriageTrainId, type: carriageType } =
      await this.carriagesService.findUnique({
        id: carriageId,
      });

    if (carriageTrainId !== trainId)
      throw new InvalidRequestedBody('Invalid train number');

    if (seat > 20 && carriageType === CarriageType.comfort)
      throw new InvalidRequestedBody('Invalid seat number');

    const ticketAlreadyBought = await this.ticketsService.findFirst({
      carriageId,
      seat,
    });

    if (ticketAlreadyBought) throw new ConflictException();

    const departureTime = {
      gt: moment().add(3, 'd').toISOString(),
    };

    const route = await this.routesService.findFirst({
      OR: [
        {
          startStationId,
          endStationId,
          departureTime,
        },
        {
          startStationId,
          stationsBetween: {
            some: {
              stationId: endStationId,
              departureTime,
            },
          },
        },
        {
          AND: [
            {
              stationsBetween: {
                some: {
                  stationId: startStationId,
                  departureTime,
                },
              },
            },
            {
              stationsBetween: {
                some: {
                  stationId: endStationId,
                },
              },
            },
          ],
        },
        {
          stationsBetween: {
            some: {
              stationId: startStationId,
              departureTime,
            },
          },
          endStationId,
        },
      ],
    });

    if (!route) throw new InvalidRequestedBody('Invalid stations');

    const { type: trainType } = await this.trainsService.findUnique({
      id: trainId,
    });

    const price = await this.pricesService.firdFirst({
      carriageType,
      trainType,
      startStationId,
      endStationId,
    });

    if (!price)
      throw new InvalidRequestedBody('Something went wrong, try again later');

    const ticket = await this.ticketsService.create({
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
    console.log(ticket);

    return ticket;
  }
}
