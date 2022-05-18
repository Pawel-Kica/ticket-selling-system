import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateTicketExtendedDto,
  TicketMainSelect,
} from '../../@types/models/tickets.types.dto';
import { RequireUser } from '../../guards/requireUser.guard';
import { TicketsService } from './tickets.service';
import { createTicketSchema } from '../../validation/schemas/ticket.schema';
import { ApplyValidation } from '../../validation/validationPipe';
import { UserId } from '../../decorators/userId.decorator';
import { SuccessResponse } from '../../utils/responses';

@ApiBearerAuth()
@UseGuards(RequireUser)
@ApiTags('User - Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  async getUserTickets(@UserId() id: string) {
    return this.ticketsService.findMany(
      {
        userId: id,
      },
      TicketMainSelect,
    );
  }

  @Post()
  async create(
    @UserId() id: string,
    @Body(ApplyValidation(createTicketSchema))
    body: CreateTicketExtendedDto,
  ) {
    await this.ticketsService.validateAndCreate({
      ...body,
      userId: id,
    });
    return SuccessResponse;
  }
}
