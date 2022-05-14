import {
  Controller,
  Post,
  Body,
  UseGuards,
  ConflictException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarriageType } from '@prisma/client';
import { CreateTicketExtendedDto } from '../../@types/models/tickets.types.dto';
import { UserId } from '../../decorators/user.decorator';
import { RequireUser } from '../../guards/requireUser';
import { threeDaysAhead } from '../../prisma/seed/data/routes.seed.data';
import { InvalidRequestedBody } from '../../utils/responses/errors';
import { CarriagesService } from '../carriage/carriage.service';
import { RoutesService } from '../routes/routes.service';
import { TrainsService } from '../trains/trains.service';
import { UsersService } from '../users/users.service';
import { TicketsService } from './tickets.service';

@ApiBearerAuth()
@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly usersService: UsersService,
    private readonly carriagesService: CarriagesService,
    private readonly trainsService: TrainsService,
    private readonly routesService: RoutesService,
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
    if (seat > 20) {
      const carriage = await this.carriagesService.findUnique({
        id: carriageId,
      });
      if (carriage.type === CarriageType.comfort)
        throw new InvalidRequestedBody('Invalid seat number');
    }

    const alreadyTaken = await this.ticketsService.findFirst({
      carriageId: carriageId,
      seat: seat,
    });

    if (alreadyTaken) throw new ConflictException();

    const departureTime = {
      gt: threeDaysAhead.toISOString(),
    };

    const route = this.routesService.findAll({
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
          stationsBetween: {
            some: {
              id: startStationId,
              departureTime,
            },
          },
          endStationId,
        },
      ],
    });

    console.log(route);

    if (!route) throw new InvalidRequestedBody('Invalid stations');

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

    return ticket;
  }
}
