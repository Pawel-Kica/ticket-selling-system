
import {Position} from '@prisma/client'
import {Train} from '../../train/entities/train.entity'
import {Carriage} from '../../carriage/entities/carriage.entity'


export class Employee {
  id: string ;
name: string ;
surname: string ;
dateOfBirth: Date ;
address: string ;
telephoneNumber: string ;
position: Position ;
photoPath: string ;
driver?: Train[] ;
driverHelper?: Train[] ;
conductor1?: Carriage[] ;
conductor2?: Carriage[] ;
}
