
import {TrainType} from '@prisma/client'
import {User} from '../../user/entities/user.entity'
import {Route} from '../../route/entities/route.entity'
import {Employee} from '../../employee/entities/employee.entity'
import {Carriage} from '../../carriage/entities/carriage.entity'
import {Ticket} from '../../ticket/entities/ticket.entity'


export class Train {
  id: string ;
routeId: string  | null;
bossId: string  | null;
driverId: string  | null;
driverHelperId: string  | null;
type: TrainType ;
boss?: User  | null;
route?: Route  | null;
driver?: Employee  | null;
driverHelper?: Employee  | null;
carriage?: Carriage[] ;
ticket?: Ticket[] ;
}
