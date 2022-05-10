
import {State} from '@prisma/client'
import {Carriage} from '../../carriage/entities/carriage.entity'
import {Train} from '../../train/entities/train.entity'
import {Station} from '../../station/entities/station.entity'


export class Ticket {
  id: string ;
seat: number ;
carriageId: string ;
trainId: string ;
startStationId: string ;
endStationId: string ;
state: State ;
dateTimeOfOperation: Date ;
carriage?: Carriage ;
train?: Train ;
startStation?: Station ;
endStation?: Station ;
}
