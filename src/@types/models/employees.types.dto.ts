// Nest
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// Prisma
import { Position, Prisma } from '@prisma/client';
// Tools
import { Transform } from 'class-transformer';
import { ToNumber } from '../../utils/query/transform';
import { Employee } from './../../resource/dto/employee/entities/employee.entity';

export type CreateEmployeeDtoPrisma = Prisma.EmployeeCreateInput;
export type EmployeeWhereUniqueInput = Prisma.EmployeeWhereUniqueInput;
export type EmployeeWhereInput = Prisma.EmployeeWhereInput;
export type EmployeeSelect = Prisma.EmployeeSelect;

export class FindManyEmployeesQuery {
  @ApiPropertyOptional()
  @Transform(({ value }) => ToNumber(value))
  take: number;
}

export class EmployeeEntityDto {
  id: Employee['id'];
  name: Employee['name'];
  surname: Employee['surname'];
  dateOfBirth: Employee['dateOfBirth'];
  address: Employee['address'];
  telephoneNumber: Employee['telephoneNumber'];
  @ApiProperty({ enum: Position })
  position: Position;
  photoPath: Employee['photoPath'];
}
