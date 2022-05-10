
import {CarriageType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateCarriageDto {
  @ApiProperty({ enum: CarriageType})
type?: CarriageType;
}
