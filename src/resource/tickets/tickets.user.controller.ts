import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTicketExtendedDto } from '../../@types/models/tickets.types.dto';
import { RequireUser } from '../../guards/requireUser';
import { CarriagesService } from '../carriage/carriage.service';
import { RoutesService } from '../routes/routes.service';
import { TrainsService } from '../trains/trains.service';
import { TicketsService } from './tickets.service';
import { PricesService } from '../prices/prices.service';
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
  getUserTickets(@UserId() id: string) {
    return this.ticketsService.findMany({
      userId: id,
    });
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
    const { type: carriageType } = await this.carriagesService.validateCarriage(
      {
        carriageId,
        trainId,
        seat,
      },
    );

    await this.ticketsService.checkTicketAvailability({ carriageId, seat });

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

    return this.ticketsService.createWithParams({
      id,
      trainId,
      carriageId,
      startStationId,
      endStationId,
      seat,
    });
  }
}
