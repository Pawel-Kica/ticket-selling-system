
import {TrainType,CarriageType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdatePriceDto {
  value?: number;
@ApiProperty({ enum: TrainType})
trainType?: TrainType;
@ApiProperty({ enum: CarriageType})
carriageType?: CarriageType;
}
