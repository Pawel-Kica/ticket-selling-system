import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findMany() {
    return this.employeesService.findMany();
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return this.employeesService.safeFindUnique({ id });
  }
}
