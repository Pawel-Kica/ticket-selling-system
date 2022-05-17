import { Controller, Get, UseGuards, Query, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ValidateAndCreateTicketDto,
  TicketsLookupQuery,
} from '../../@types/models/tickets.types.dto';
import { RequireManager } from '../../guards/roles.';
import { createTicketByManagerSchema } from '../../validation/schemas/ticket.schema';
import { ApplyValidation } from '../../validation/validationPipe';
import { UsersService } from '../users/users.service';
import { TicketsService } from './tickets.service';

@ApiBearerAuth()
@ApiTags('Manager - Tickets')
@Controller('manager/tickets')
@UseGuards(RequireManager)
export class TicketsManagerController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findMany(
    @Query()
    { trainId, carriageId, state, routeId, userId }: TicketsLookupQuery,
  ) {
    const tickets = await this.ticketsService.findMany(
      {
        trainId,
        userId,
        carriageId,
        state,
        train: {
          routeId,
        },
      },
      {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
        trainId: true,
        carriage: {
          select: {
            id: true,
            type: true,
          },
        },
        state: true,
        seat: true,
        startStation: true,
        endStation: true,
        timeOfOperation: true,
      },
    );

    return tickets;
  }

  @Post()
  async book(
    @Body(ApplyValidation(createTicketByManagerSchema))
    body: ValidateAndCreateTicketDto,
  ) {
    await this.usersService.checkIfUserExists({ id: body.userId });

    const ticket = await this.ticketsService.validateAndCreate(body);
    return ticket;
  }
}
