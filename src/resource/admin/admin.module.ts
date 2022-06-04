// Nest
import { Module } from '@nestjs/common';
// Modules
import { UsersModule } from '../users/users.module';
import { PricesModule } from '../prices/prices.module';
import { StationsModule } from '../stations/stations.module';
import { EmployeesModule } from '../employees/employees.module';
// Controllers
import { AdminController } from './admin.controller';
import { AdminUsersController } from './controllers/admin.users.controller';
import { AdminEmployeesController } from './controllers/admin.employees.controller';
import { AdminStationsController } from './controllers/admin.stations.controller';
import { AdminPricesController } from './controllers/admin.prices.controller';

@Module({
  imports: [UsersModule, EmployeesModule, StationsModule, PricesModule],
  controllers: [
    AdminController,
    AdminUsersController,
    AdminEmployeesController,
    AdminStationsController,
    AdminPricesController,
  ],
})
export class AdminModule {}
