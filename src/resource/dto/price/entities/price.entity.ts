
import {TrainType,CarriageType} from '@prisma/client'
import {Station} from '../../station/entities/station.entity'


export class Price {
  id: string ;
startStationId: string ;
endStationId: string ;
value: number ;
trainType: TrainType ;
carriageType: CarriageType ;
startStation?: Station ;
endStation?: Station ;
}
