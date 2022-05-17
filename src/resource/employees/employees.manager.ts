import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequireManager } from '../../guards/roles.';
import { EmployeesService } from './employees.service';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { FindManyEmployeesQuery } from './employees.types';

@ApiBearerAuth()
@ApiTags('Manager - employees')
@Controller('manager/employees')
@UseGuards(RequireManager)
export class EmployeesManagerController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findMany(@Query() { take }: FindManyEmployeesQuery) {
    return this.employeesService.findMany({}, take);
  }
  @Get(':id')
  findUnique(@Param('id') id: string) {
    return this.employeesService.safeFindUnique({ id });
  }
}
