// Nest
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Query, Post, Body } from '@nestjs/common';
// Types
import {
  ValidateAndCreateTicketDto,
  TicketsLookupQuery,
  TicketUserSelect,
  CreateTicketByManagerResponseDto,
} from '../../@types/models/tickets.types.dto';
// Guards
import { RequireManager } from '../../guards/requireRole.guard';
// Services
import { UsersService } from '../users/users.service';
import { TicketsService } from './tickets.service';
// Validation
import { ApplyValidation } from '../../validation/validationPipe';
import { createTicketByManagerSchema } from '../../validation/schemas/ticket.schema';

@ApiBearerAuth()
@UseGuards(RequireManager)
@ApiTags('Manager - Tickets')
@Controller('manager/tickets')
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
  async create(
    @Body(ApplyValidation(createTicketByManagerSchema))
    body: ValidateAndCreateTicketDto,
  ): Promise<CreateTicketByManagerResponseDto> {
    await this.usersService.checkIfUserExists({ id: body.userId });
    const ticket = await this.ticketsService.validateAndCreate(body);
    return ticket;
  }
}
