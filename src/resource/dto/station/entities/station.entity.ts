
import {RoutePoint} from '../../routePoint/entities/routePoint.entity'
import {Route} from '../../route/entities/route.entity'
import {Price} from '../../price/entities/price.entity'
import {Ticket} from '../../ticket/entities/ticket.entity'


export class Station {
  id: string ;
name: string ;
routeStationsBetween?: RoutePoint[] ;
routeStartStations?: Route[] ;
routeEndStations?: Route[] ;
priceStartStations?: Price[] ;
priceEndStations?: Price[] ;
ticketStartStations?: Ticket[] ;
ticketEndStations?: Ticket[] ;
}
