
import {CarriageType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateCarriageDto {
  numberOfSeats?: number;
@ApiProperty({ enum: CarriageType})
type?: CarriageType;
}
