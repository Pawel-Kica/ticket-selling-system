// Nest
import { ApiProperty } from '@nestjs/swagger';
// Prisma
import { Position, Prisma } from '@prisma/client';
// Tools
import { Employee } from './../../resource/dto/employee/entities/employee.entity';

export type CreateEmployeeDtoPrisma = Prisma.EmployeeCreateInput;
export type EmployeeWhereUniqueInput = Prisma.EmployeeWhereUniqueInput;
export type EmployeeWhereInput = Prisma.EmployeeWhereInput;
export type EmployeeSelect = Prisma.EmployeeSelect;

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
