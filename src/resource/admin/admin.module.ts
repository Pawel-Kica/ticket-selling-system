// Nest
import { Module } from '@nestjs/common';
// Modules
import { UsersModule } from '../users/users.module';
import { EmployeesModule } from '../employees/employees.module';
// Controllers
import { AdminController } from './admin.controller';
import { AdminUsersController } from './controllers/admin.users.controller';
import { AdminEmployeesController } from './controllers/admin.employees.controller';
import { StationsModule } from '../stations/stations.module';
import { AdminStationsController } from './controllers/admin.stations.controller';

@Module({
  imports: [UsersModule, EmployeesModule, StationsModule],
  controllers: [
    AdminController,
    AdminUsersController,
    AdminEmployeesController,
    AdminStationsController,
  ],
})
export class AdminModule {}
