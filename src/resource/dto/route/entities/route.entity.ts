
import {Train} from '../../train/entities/train.entity'


export class Route {
  id: string ;
arrivalTime: Date ;
departureTime: Date ;
train?: Train[] ;
}
