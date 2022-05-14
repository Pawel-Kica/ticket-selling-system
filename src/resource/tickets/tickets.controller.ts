import * as moment from 'moment';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTicketExtendedDto } from '../../@types/models/tickets.types.dto';
import { UserId } from '../../decorators/user.decorator';
import { RequireUser } from '../../guards/requireUser';
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
    // if (seat > 20) {
    //   const carriage = await this.carriagesService.findUnique({
    //     id: carriageId,
    //   });
    //   if (carriage.type === CarriageType.comfort)
    //     throw new InvalidRequestedBody('Invalid seat number');
    // }

    // const alreadyTaken = await this.ticketsService.findFirst({
    //   carriageId: carriageId,
    //   seat: seat,
    // });

    // if (alreadyTaken) throw new ConflictException();

    const departureTime = {
      gt: moment().add(3, 'd').toISOString(),
    };

    const routes = await this.routesService.findAll({
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

    console.log(routes);

    if (!routes.length) throw new InvalidRequestedBody('Invalid stations');

    return 'wtf route isniteje';

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
