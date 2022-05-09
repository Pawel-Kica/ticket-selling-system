import { Prisma } from '@prisma/client';

export type CreateEmployeeDto = Prisma.EmployeeCreateInput;
export type EmployeeWhereUniqueInput = Prisma.EmployeeWhereUniqueInput;

// export class CreateEmployeeDto {
//   name: string;
//   surname: string;
//   body: string;
//   photoPath: string;
// }
