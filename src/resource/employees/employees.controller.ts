import { Controller, Get, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return this.employeesService.safeFindUnique({ id });
  }
}
