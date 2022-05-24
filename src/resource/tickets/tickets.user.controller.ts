// Nest
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
// Types
import {
  CreateTicketBody,
  CreateTicketResponse,
  TicketEntity,
} from '../../@types/models/tickets.types.dto';
// Guards
import { RequireUser } from '../../guards/requireUser.guard';
// Services
import { TicketsService } from './tickets.service';
// Validation
import { ApplyValidation } from '../../validation/validationPipe';
import { createTicketSchema } from '../../validation/schemas/ticket.schema';
// Decorators
import { UserID } from '../../decorators/userID.decorator';
// Responses
import { ApiForbiddenResponseDescription } from '../../utils/swagger';
import { ApiCreateTicket } from '../../utils/swagger/decorators';

@ApiBearerAuth()
@ApiForbiddenResponseDescription()
@UseGuards(RequireUser)
@ApiTags('User - Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @ApiOperation({
    description: `Returns user's book/bought tickets`,
  })
  @Get()
  async get(@UserID() id: string): Promise<TicketEntity[]> {
    return this.ticketsService.findManyIncludeTrains({
      userId: id,
    });
  }

  @ApiCreateTicket(
    `Creates a new ticket. Ordinary users can only buy tickets, no option to provide ticket "state" property`,
  )
  @Post()
  async create(
    @UserID() id: string,
    @Body(ApplyValidation(createTicketSchema))
    body: CreateTicketBody,
  ): Promise<CreateTicketResponse> {
    const ticket = await this.ticketsService.validateAndCreate({
      ...body,
      userId: id,
    });
    return ticket;
  }
}
