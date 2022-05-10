
import {CarriageType} from '@prisma/client'
import {Train} from '../../train/entities/train.entity'
import {Employee} from '../../employee/entities/employee.entity'
import {Ticket} from '../../ticket/entities/ticket.entity'


export class Carriage {
  id: string ;
trainId: string ;
conductor1Id: string ;
conductor2Id: string ;
type: CarriageType ;
train?: Train ;
conductor1?: Employee ;
conductor2?: Employee ;
ticket?: Ticket[] ;
}
