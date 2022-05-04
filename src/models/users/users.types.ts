import { Prisma, User } from '@prisma/client';

export type CreateUserDto = Prisma.UserCreateInput;
export type UpdateUserDto = Prisma.UserUpdateInput;
export type WhereUniqueUserDto = Prisma.UserWhereUniqueInput;

export class LoginUserDto {
  public email: string;
  public password: string;
}
