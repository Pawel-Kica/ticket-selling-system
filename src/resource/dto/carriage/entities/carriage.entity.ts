
import {CarriageType} from '@prisma/client'
import {Train} from '../../train/entities/train.entity'
import {Employee} from '../../employee/entities/employee.entity'
import {Ticket} from '../../ticket/entities/ticket.entity'


export class Carriage {
  id: string ;
numberOfSeats: number ;
type: CarriageType ;
trainId: string ;
conductor1Id: string  | null;
conductor2Id: string  | null;
train?: Train ;
conductor1?: Employee  | null;
conductor2?: Employee  | null;
ticket?: Ticket[] ;
}
