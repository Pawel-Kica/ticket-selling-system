import { PrismaService } from 'nestjs-prisma';
import { EmployeeWhereUniqueDto } from './employees.types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/employee/dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateEmployeeDto) {
    const employee = await this.prisma.employee.create({ data });
    return employee;
  }
  async findMany() {
    const employees = await this.prisma.employee.findMany();
    return employees;
  }
  async findUnique(where: EmployeeWhereUniqueDto) {
    return this.prisma.employee.findUnique({ where });
  }

  async safeFindUnique(where: EmployeeWhereUniqueDto) {
    const employee = await this.findUnique(where);
    if (!employee) throw new NotFoundException();
    return employee;
  }
  async remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
