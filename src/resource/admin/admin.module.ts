import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AdminController } from './admin.controller';
import { AdminUsersController } from './controllers/admin.users.controller';
import { AdminEmployeesController } from './controllers/admin.employees.controller';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [UsersModule, EmployeesModule],
  controllers: [
    AdminController,
    AdminUsersController,
    AdminEmployeesController,
  ],
})
export class AdminModule {}
