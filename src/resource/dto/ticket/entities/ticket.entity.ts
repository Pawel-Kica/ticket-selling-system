
import {State} from '@prisma/client'
import {User} from '../../user/entities/user.entity'
import {Train} from '../../train/entities/train.entity'
import {Carriage} from '../../carriage/entities/carriage.entity'
import {Station} from '../../station/entities/station.entity'


export class Ticket {
  id: string ;
seat: number ;
userId: string ;
trainId: string ;
carriageId: string ;
startStationId: string  | null;
endStationId: string  | null;
state: State ;
timeOfOperation: Date ;
user?: User ;
train?: Train ;
carriage?: Carriage ;
startStation?: Station  | null;
endStation?: Station  | null;
}
