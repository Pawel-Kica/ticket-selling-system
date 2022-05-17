import {
  Controller,
  Post,
  Body,
  UseGuards,
  ConflictException,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTicketExtendedDto } from '../../@types/models/tickets.types.dto';
import { RequireUser } from '../../guards/requireUser';
import { InvalidRequestedBody } from '../../utils/responses/errors';
import { CarriagesService } from '../carriage/carriage.service';
import { RoutesService } from '../routes/routes.service';
import { TrainsService } from '../trains/trains.service';
import { TicketsService } from './tickets.service';
import { PricesService } from '../prices/prices.service';
import { CarriageType } from '@prisma/client';
import { createTicketSchema } from '../../validation/schemas/ticket.schema';
import { ApplyValidation } from '../../validation/validationPipe';
import { UserId } from '../../decorators/user.decorator';

@ApiBearerAuth()
@ApiTags('User - Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly carriagesService: CarriagesService,
    private readonly trainsService: TrainsService,
    private readonly routesService: RoutesService,
    private readonly pricesService: PricesService,
  ) {}

  @Get()
  @UseGuards(RequireUser)
  async getUserTickets(@UserId() id: string) {
    const tickets = await this.ticketsService.findMany({
      userId: id,
    });

    return tickets;
  }

  @Post()
  @UseGuards(RequireUser)
  async create(
    @UserId() id: string,
    @Body(ApplyValidation(createTicketSchema))
    {
      trainId,
      seat,
      startStationId,
      endStationId,
      carriageId,
    }: CreateTicketExtendedDto,
  ) {
    const carriage = await this.carriagesService.findUnique({
      id: carriageId,
    });

    if (!carriage) throw new InvalidRequestedBody('Invalid carriage id');

    if (carriage.trainId !== trainId)
      throw new InvalidRequestedBody('Invalid train id');

    if (seat > 20 && carriage.type === CarriageType.comfort)
      throw new InvalidRequestedBody('Invalid seat number');

    const ticketAlreadyBought = await this.ticketsService.findFirst({
      carriageId,
      seat,
    });
    if (ticketAlreadyBought) throw new ConflictException();

    const routes = await this.routesService.findManyWithStations({
      startStationId,
      endStationId,
    });
    if (!routes.length) throw new InvalidRequestedBody('Invalid stations');

    const { type: trainType } = await this.trainsService.findUnique({
      id: trainId,
    });

    const price = await this.pricesService.firdFirst({
      carriageType: carriage.type,
      trainType,
      startStationId,
      endStationId,
    });
    if (!price)
      throw new InvalidRequestedBody('Something went wrong, try again later');

    const ticket = await this.ticketsService.createWithParams({
      id,
      trainId,
      carriageId,
      startStationId,
      endStationId,
      seat,
    });

    return ticket;
  }
}
