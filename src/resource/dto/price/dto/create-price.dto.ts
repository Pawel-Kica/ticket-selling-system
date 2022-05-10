
import {TrainType,CarriageType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreatePriceDto {
  value: number;
@ApiProperty({ enum: TrainType})
trainType: TrainType;
@ApiProperty({ enum: CarriageType})
carriageType: CarriageType;
}
