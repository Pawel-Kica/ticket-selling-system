// Nest
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// Types
import {
  EmployeeWhereInput,
  EmployeeWhereUniqueInput,
} from '../../@types/models/employees.types.dto';
import { CreateEmployeeDto } from '../dto/employee/dto/create-employee.dto';

export const defaultEmployeesTakeNumber = 3;

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEmployeeDto) {
    return this.prisma.employee.create({ data });
  }
  async delete(where: EmployeeWhereUniqueInput) {
    if (!(await this.findUnique(where))) throw new NotFoundException();
    return this.prisma.employee.delete({ where });
  }
  async findMany(where: EmployeeWhereInput, take = defaultEmployeesTakeNumber) {
    return this.prisma.employee.findMany({
      where,
      take,
      orderBy: {
        id: 'asc',
      },
    });
  }
  async findUnique(where: EmployeeWhereUniqueInput) {
    return this.prisma.employee.findUnique({ where });
  }
}
