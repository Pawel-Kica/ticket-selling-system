
import {Price} from '../../price/entities/price.entity'
import {Ticket} from '../../ticket/entities/ticket.entity'


export class Station {
  id: string ;
name: string ;
priceStartStations?: Price[] ;
priceEndStations?: Price[] ;
startStations?: Ticket[] ;
endStations?: Ticket[] ;
}
