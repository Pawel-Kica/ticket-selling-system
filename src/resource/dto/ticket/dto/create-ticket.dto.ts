
import {State} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateTicketDto {
  @ApiProperty({ enum: State})
state: State;
}
