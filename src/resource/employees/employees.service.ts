// Nest
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// Types
import {
  EmployeeWhereDto,
  EmployeeWhereUniqueDto,
} from '../../@types/models/employees.types.dto';
import { CreateEmployeeDto } from '../dto/employee/dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEmployeeDto) {
    return this.prisma.employee.create({ data });
  }
  async findMany(where?: EmployeeWhereDto, take = 3) {
    return this.prisma.employee.findMany({
      where,
      take,
      orderBy: {
        id: 'asc',
      },
    });
  }
  async findUnique(where: EmployeeWhereUniqueDto) {
    return this.prisma.employee.findUnique({ where });
  }
}
