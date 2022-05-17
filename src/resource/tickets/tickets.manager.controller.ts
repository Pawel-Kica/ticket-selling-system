// Nest
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Query, Post, Body } from '@nestjs/common';
// Types
import {
  ValidateAndCreateTicketDto,
  TicketsLookupQuery,
  TicketUserSelect,
} from '../../@types/models/tickets.types.dto';
// Guards
import { RequireManager } from '../../guards/requireRole.guard';
// Services
import { UsersService } from '../users/users.service';
import { TicketsService } from './tickets.service';
// Validation
import { createTicketByManagerSchema } from '../../validation/schemas/ticket.schema';
import { ApplyValidation } from '../../validation/validationPipe';

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
    return this.ticketsService.findMany(
      {
        trainId,
        userId,
        carriageId,
        state,
        train: {
          routeId,
        },
      },
      TicketUserSelect,
    );
  }

  @Post()
  async book(
    @Body(ApplyValidation(createTicketByManagerSchema))
    body: ValidateAndCreateTicketDto,
  ) {
    await this.usersService.checkIfUserExists({ id: body.userId });
    return this.ticketsService.validateAndCreate(body);
  }
}
