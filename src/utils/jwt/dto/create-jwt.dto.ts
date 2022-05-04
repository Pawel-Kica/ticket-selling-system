import { Employee } from '../../../models/employees/entities/employee.entity';
import { Session } from '../../../models/sessions/entities/session.entity';

export class CreateJwtTokenDto {
  employeeId: Employee['id'];
  sessionId: Session['id'];
  accountType: Employee;
}
