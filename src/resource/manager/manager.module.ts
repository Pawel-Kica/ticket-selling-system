import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './controllers/manager.controller';
import { UsersModule } from '../users/users.module';
import { EmployeesManagerController } from './controllers/manager.employees.controller';
import { TicketsManagerController } from './controllers/manager.tickets.controller';
import { EmployeesModule } from '../employees/employees.module';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [UsersModule, EmployeesModule, TicketsModule],
  controllers: [
    ManagerController,
    TicketsManagerController,
    EmployeesManagerController,
  ],
  providers: [ManagerService],
})
export class ManagerModule {}
