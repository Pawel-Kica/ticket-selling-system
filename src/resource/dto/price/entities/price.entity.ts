
import {TrainType,CarriageType} from '@prisma/client'
import {Station} from '../../station/entities/station.entity'


export class Price {
  id: string ;
startStationId: string ;
endStationId: string ;
trainType: TrainType ;
carriageType: CarriageType ;
value: number ;
startStation?: Station ;
endStation?: Station ;
}
