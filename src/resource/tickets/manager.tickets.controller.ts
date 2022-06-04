// Nest
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Query, Post, Body } from '@nestjs/common';
// Types
import {
  CreateTicketParams,
  CreateTicketByManagerResponse,
  TicketUserSelectEntity,
} from '../../@types/models/tickets.types.dto';
import { TicketsLookupQuery } from '../../utils/query/index.types';
// Guards
import { RequireManager } from '../../guards/requireRole.guard';
// Services
import { UsersService } from '../users/users.service';
import { TicketsService } from './tickets.service';
// Validation
import { ApplyValidation } from '../../validation/validationPipe';
import { createTicketByManagerSchema } from '../../validation/schemas/ticket.schema';
import { ApiCreateTicketByManager } from '../../utils/swagger/decorators';
import { ApiForbiddenResponseDescription } from '../../utils/swagger';
import {
  carriageIdFilter,
  routeIdFilter,
  trainIdFilter,
  userIdFilter,
} from '../../utils/swagger/params';

@ApiBearerAuth()
@ApiForbiddenResponseDescription()
@UseGuards(RequireManager)
@ApiTags('Manager - Tickets')
@Controller('manager/tickets')
export class TicketsManagerController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly usersService: UsersService,
  ) {}

  @ApiQuery(userIdFilter)
  @ApiQuery(routeIdFilter)
  @ApiQuery(trainIdFilter)
  @ApiQuery(carriageIdFilter)
  @ApiQuery({
    name: 'state',
    description: 'Filter by (ticket) state property',
    required: false,
  })
  @Get()
  async findMany(
    @Query()
    { trainId, carriageId, state, routeId, userId }: TicketsLookupQuery,
  ): Promise<TicketUserSelectEntity[]> {
    return this.ticketsService.findManyIncludeUsers({
      trainId,
      userId,
      carriageId,
      state,
      train: {
        routeId,
      },
    });
  }

  @ApiCreateTicketByManager(
    `Creates a new ticket for specified user. Manager can choose between "book" and "bought" state`,
  )
  @Post()
  async create(
    @Body(ApplyValidation(createTicketByManagerSchema))
    body: CreateTicketParams,
  ): Promise<CreateTicketByManagerResponse> {
    await this.usersService.checkIfUserExists({ id: body.userId });
    const ticket = await this.ticketsService.validateAndCreate(body);
    return ticket;
  }
}
