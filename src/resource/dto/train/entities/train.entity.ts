import { TrainType } from '@prisma/client';
import { User } from '../../user/entities/user.entity';
import { Route } from '../../route/entities/route.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Carriage } from '../../carriage/entities/carriage.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';

export class Train {
  id: string;
  routeId: string;
  bossId: string;
  driverId: string;
  driverHelperId: string;
  type: TrainType;
  boss?: User;
  route?: Route;
  driver?: Employee;
  driverHelper?: Employee;
  carriage?: Carriage[];
  ticket?: Ticket[];
}
