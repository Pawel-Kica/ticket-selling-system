
import {TrainType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateTrainDto {
  @ApiProperty({ enum: TrainType})
type: TrainType;
}
