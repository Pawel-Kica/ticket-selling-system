
import {Station} from '../../station/entities/station.entity'
import {Route} from '../../route/entities/route.entity'


export class RoutePoint {
  id: string ;
routeId: string ;
stationId: string  | null;
departureTime: Date ;
arrivalTime: Date ;
order: number ;
station?: Station  | null;
route?: Route ;
}
