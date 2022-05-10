
import {Role} from '@prisma/client'
import {Train} from '../../train/entities/train.entity'
import {Ticket} from '../../ticket/entities/ticket.entity'


export class User {
  id: string ;
name: string ;
surname: string ;
email: string ;
password: string ;
role: Role ;
blocked: boolean ;
Train?: Train[] ;
Ticket?: Ticket[] ;
}
