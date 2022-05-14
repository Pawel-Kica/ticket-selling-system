
import {TrainType,CarriageType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdatePriceDto {
  @ApiProperty({ enum: TrainType})
trainType?: TrainType;
@ApiProperty({ enum: CarriageType})
carriageType?: CarriageType;
value?: number;
}
