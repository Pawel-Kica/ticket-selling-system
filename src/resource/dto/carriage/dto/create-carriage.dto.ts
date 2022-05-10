
import {CarriageType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateCarriageDto {
  @ApiProperty({ enum: CarriageType})
type: CarriageType;
}
