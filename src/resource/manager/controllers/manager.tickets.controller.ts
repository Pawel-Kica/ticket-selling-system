import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Query, Post, Body } from '@nestjs/common';
import {
  TicketUserSelectEntity,
  CreateTicketParams,
  CreateTicketByManagerResponse,
} from '../../../@types/models/tickets.types.dto';
import { RequireManager } from '../../../guards/requireRole.guard';
import { TicketsLookupQuery } from '../../../utils/query/index.types';
import { ApiForbiddenResponseDescription } from '../../../utils/swagger';
import { ApiCreateTicketByManager } from '../../../utils/swagger/decorators';
import {
  userIdFilter,
  routeIdFilter,
  trainIdFilter,
  carriageIdFilter,
} from '../../../utils/swagger/params';
import { createTicketByManagerSchema } from '../../../validation/schemas/ticket.schema';
import { ApplyValidation } from '../../../validation/validationPipe';
import { TicketsService } from '../../tickets/tickets.service';
import { UsersService } from '../../users/users.service';

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
