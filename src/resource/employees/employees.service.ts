import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateEmployeeDto, EmployeeWhereUniqueInput } from './employees.types';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateEmployeeDto) {
    return this.prisma.employee.create({ data });
  }
  async findAll() {
    return `This action returns all employees`;
  }

  async findUnique(where: EmployeeWhereUniqueInput) {
    return this.prisma.employee.findUnique({ where });
  }

  async safeFindUnique(where: Prisma.UserWhereUniqueInput) {
    const employee = await this.findUnique(where);
    if (!employee) throw new NotFoundException();
    return employee;
  }
  async remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
