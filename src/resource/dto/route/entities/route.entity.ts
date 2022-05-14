
import {Station} from '../../station/entities/station.entity'
import {Train} from '../../train/entities/train.entity'
import {RoutePoint} from '../../routePoint/entities/routePoint.entity'


export class Route {
  id: string ;
arrivalTime: Date ;
departureTime: Date ;
startStationId: string ;
endStationId: string ;
startStation?: Station ;
endStation?: Station ;
train?: Train[] ;
RoutePoint?: RoutePoint[] ;
}
