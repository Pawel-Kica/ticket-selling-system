// Nest
import { Injectable, NotFoundException } from '@nestjs/common';
// Prisma
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
// Dto
import { CreateUserDto } from '../../@types/models/users.types';
// Tools
import { omit } from '../../utils/objects';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  formattedUser(user: User) {
    return omit(user, 'password');
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findUnique(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) {
    return this.prisma.user.update({ where, data });
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where });
  }

  async checkIfUserExists(where: Prisma.UserWhereUniqueInput) {
    if (!(await this.findUnique(where))) throw new NotFoundException();
  }
}
