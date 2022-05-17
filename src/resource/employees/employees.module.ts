import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { UsersModule } from '../users/users.module';
import { EmployeesManagerController } from './employees.manager';

@Module({
  imports: [UsersModule],
  controllers: [EmployeesController, EmployeesManagerController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
