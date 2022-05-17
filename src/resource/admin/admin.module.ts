// Nest
import { Module } from '@nestjs/common';
// Modules
import { UsersModule } from '../users/users.module';
import { EmployeesModule } from '../employees/employees.module';
// Controllers
import { AdminController } from './admin.controller';
import { AdminUsersController } from './controllers/admin.users.controller';
import { AdminEmployeesController } from './controllers/admin.employees.controller';

@Module({
  imports: [UsersModule, EmployeesModule],
  controllers: [
    AdminController,
    AdminUsersController,
    AdminEmployeesController,
  ],
})
export class AdminModule {}
