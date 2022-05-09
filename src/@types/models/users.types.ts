import { Prisma } from '@prisma/client';

export type CreateUserDto = Prisma.UserCreateInput;
export type UpdateUserDto = Prisma.UserUpdateInput;
export type WhereUniqueUserDto = Prisma.UserWhereUniqueInput;
export class LoginUserDto {
  email: string;
  password: string;
}
