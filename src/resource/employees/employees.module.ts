// Nest
import { Module } from '@nestjs/common';
// Modules
import { UsersModule } from '../users/users.module';
// Controllers
import { EmployeesController } from './employees.controller';
// Services
import { EmployeesService } from './employees.service';

@Module({
  imports: [UsersModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
