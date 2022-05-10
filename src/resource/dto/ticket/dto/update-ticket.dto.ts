
import {State} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateTicketDto {
  @ApiProperty({ enum: State})
state?: State;
}
