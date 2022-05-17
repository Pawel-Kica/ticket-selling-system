// Nest
import { ApiPropertyOptional } from '@nestjs/swagger';
// Prisma
import { Prisma } from '@prisma/client';
// Tools
import { Transform } from 'class-transformer';
import { ToNumber } from '../../utils/query/transform';

export type CreateEmployeeDtoPrisma = Prisma.EmployeeCreateInput;
export type EmployeeWhereUniqueDto = Prisma.EmployeeWhereUniqueInput;
export type EmployeeWhereDto = Prisma.EmployeeWhereInput;
export type EmployeeSelectDto = Prisma.EmployeeSelect;

export class FindManyEmployeesQuery {
  @ApiPropertyOptional()
  @Transform(({ value }) => ToNumber(value))
  take: number;
}

export const EmployeeMainSelect = {
  id: true,
  name: true,
  surname: true,
  dateOfBirth: true,
  address: true,
  telephoneNumber: true,
  position: true,
  photoPath: true,
};
