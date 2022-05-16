import { Prisma } from '@prisma/client';
import { CreateTicketDto } from '../../resource/dto/ticket/dto/create-ticket.dto';

export type CreateTicketPrismaDto = Prisma.TicketCreateInput;
export type TickerWhereDto = Prisma.TicketWhereInput;

export class CreateTicketExtendedDto extends CreateTicketDto {
  trainId: string;
  carriageId: string;
  startStationId: string;
  endStationId: string;
}
