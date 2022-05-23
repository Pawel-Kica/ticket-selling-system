// Nest
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// Types
import { EmployeeEntityDto } from '../../@types/models/employees.types.dto';
import { EmployeesLookupQuery } from '../../utils/query';
// Guards
import { RequireManager } from '../../guards/requireRole.guard';
// Services
import { EmployeesService } from './employees.service';

@ApiBearerAuth()
@UseGuards(RequireManager)
@ApiTags('Manager - employees')
@Controller('manager/employees')
export class EmployeesManagerController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async findMany(
    @Query()
    { take, position, name, surname, telephoneNumber }: EmployeesLookupQuery,
  ): Promise<EmployeeEntityDto[]> {
    return this.employeesService.findMany(
      { position, name, surname, telephoneNumber },
      take,
    );
  }

  @Get(':id')
  async findUnique(@Param('id') id: string): Promise<EmployeeEntityDto> {
    const employee = await this.employeesService.findUnique({ id });
    if (!employee) throw new NotFoundException();
    return employee;
  }
}