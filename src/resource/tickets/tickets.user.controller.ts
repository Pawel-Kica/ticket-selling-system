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
import { UserId } from '../../decorators/userId.decorator';
// Responses
import { ApiForbiddenResponseDescription } from '../../utils/responses/swagger';

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
  async get(@UserId() id: string): Promise<TicketEntity[]> {
    return this.ticketsService.findManyIncludeTrains({
      userId: id,
    });
  }

  @Post()
  async create(
    @UserId() id: string,
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
