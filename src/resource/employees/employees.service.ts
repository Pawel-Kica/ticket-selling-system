import { PrismaService } from 'nestjs-prisma';
import { EmployeeWhereDto, EmployeeWhereUniqueDto } from './employees.types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/employee/dto/create-employee.dto';

export const defaultEmployeesNumber = 3;

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateEmployeeDto) {
    const employee = await this.prisma.employee.create({ data });
    return employee;
  }
  async findMany(where: EmployeeWhereDto = {}, take = defaultEmployeesNumber) {
    const employees = await this.prisma.employee.findMany({
      where,
      take,
      orderBy: {
        id: 'asc',
      },
    });
    return employees;
  }
  async findUnique(where: EmployeeWhereUniqueDto) {
    const employee = await this.prisma.employee.findUnique({ where });
    return employee;
  }

  async safeFindUnique(where: EmployeeWhereUniqueDto) {
    const employee = await this.findUnique(where);
    if (!employee) throw new NotFoundException();
    return employee;
  }
}
