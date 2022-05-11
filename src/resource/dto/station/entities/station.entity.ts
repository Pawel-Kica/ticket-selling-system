
import {Route} from '../../route/entities/route.entity'
import {Ticket} from '../../ticket/entities/ticket.entity'


export class Station {
  id: string ;
name: string ;
routeStationsBetween?: Route[] ;
routeStartStations?: Route[] ;
routeEndStations?: Route[] ;
startStations?: Ticket[] ;
endStations?: Ticket[] ;
}
