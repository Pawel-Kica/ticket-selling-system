import { Route } from '../../route/entities/route.entity';
import { UserDto } from '../../user/entities/user.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Carriage } from '../../carriage/entities/carriage.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';

export class Train {
  id: string;
  routeId: string;
  bossId: string;
  driverId: string;
  driverHelperId: string;
  numberOfSeats: number;
  route?: Route;
  boss?: UserDto;
  driver?: Employee;
  driverHelper?: Employee;
  carriage?: Carriage[];
  ticket?: Ticket[];
}
