
import {TrainType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateTrainDto {
  @ApiProperty({ enum: TrainType})
type?: TrainType;
}
