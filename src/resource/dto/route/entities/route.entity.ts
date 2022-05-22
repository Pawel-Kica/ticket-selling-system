
import {Station} from '../../station/entities/station.entity'
import {RoutePoint} from '../../routePoint/entities/routePoint.entity'
import {Train} from '../../train/entities/train.entity'


export class Route {
  id: string ;
arrivalTime: Date ;
departureTime: Date ;
startStationId: string ;
endStationId: string ;
startStation?: Station ;
endStation?: Station ;
stationsBetween?: RoutePoint[] ;
train?: Train[] ;
}
