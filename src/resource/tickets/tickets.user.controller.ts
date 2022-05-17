import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTicketExtendedDto } from '../../@types/models/tickets.types.dto';
import { RequireUser } from '../../guards/requireUser';
import { TicketsService } from './tickets.service';
import { createTicketSchema } from '../../validation/schemas/ticket.schema';
import { ApplyValidation } from '../../validation/validationPipe';
import { UserId } from '../../decorators/user.decorator';

@ApiBearerAuth()
@ApiTags('User - Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @UseGuards(RequireUser)
  getUserTickets(@UserId() id: string) {
    return this.ticketsService.findMany({
      userId: id,
    });
  }

  @Post()
  @UseGuards(RequireUser)
  async create(
    @UserId() id: string,
    @Body(ApplyValidation(createTicketSchema))
    body: CreateTicketExtendedDto,
  ) {
    const ticket = await this.ticketsService.validateAndCreate({
      ...body,
      userId: id,
    });
    return ticket;
  }
}
