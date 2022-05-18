// Nest
import { Module } from '@nestjs/common';
// Modules
import { UsersModule } from '../users/users.module';
// Controllers
import { EmployeesController } from './employees.controller';
import { EmployeesManagerController } from './employees.manager.controller';
// Services
import { EmployeesService } from './employees.service';

@Module({
  imports: [UsersModule],
  controllers: [EmployeesController, EmployeesManagerController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
