import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateTicketBody,
  CreateTicketResponse,
  TicketEntity,
} from '../../@types/models/tickets.types.dto';
import { RequireUser } from '../../guards/requireUser.guard';
import { TicketsService } from './tickets.service';
import { createTicketSchema } from '../../validation/schemas/ticket.schema';
import { ApplyValidation } from '../../validation/validationPipe';
import { UserId } from '../../decorators/userId.decorator';

@ApiBearerAuth()
@UseGuards(RequireUser)
@ApiTags('User - Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

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
