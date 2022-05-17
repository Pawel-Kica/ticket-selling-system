import { Controller, Get, UseGuards, Query, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateTicketbyManagerDto,
  TicketsLookupQuery,
} from '../../@types/models/tickets.types.dto';
import { RequireManager } from '../../guards/roles.';
import { createTicketSchema } from '../../validation/schemas/ticket.schema';
import { ApplyValidation } from '../../validation/validationPipe';
import { TicketsService } from './tickets.service';

@ApiBearerAuth()
@ApiTags('Manager - Tickets')
@Controller('manager/tickets')
@UseGuards(RequireManager)
export class TicketsManagerController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  async findMany(
    @Query() { trainId, carriageId, state, routeId }: TicketsLookupQuery,
  ) {
    const tickets = await this.ticketsService.findMany({
      trainId,
      carriageId,
      state,
      train: {
        routeId,
      },
    });

    return tickets;
  }

  @Post()
  async book(
    @Body(ApplyValidation(createTicketSchema))
    {
      userId,
      trainId,
      seat,
      startStationId,
      endStationId,
      carriageId,
    }: CreateTicketbyManagerDto,
  ) {
    //
  }
}
