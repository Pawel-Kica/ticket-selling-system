import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequireManager } from '../../guards/roles.';
import { EmployeesService } from './employees.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';

@ApiBearerAuth()
@ApiTags('Manager - employees')
@Controller('managers/employees')
@UseGuards(RequireManager)
export class EmployeesManagerController {
  constructor(private readonly employeesService: EmployeesService) {}
  @Get()
  findMany() {
    return this.employeesService.findMany();
  }

  @Get(':id')
  findUnique(@Param('id') id: string) {
    return this.employeesService.safeFindUnique({ id });
  }
}
