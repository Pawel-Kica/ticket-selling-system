// Nest
import { Injectable } from '@nestjs/common';
// Prisma
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
// dto
import {
  CreateUserDto,
  UpdateUserDto,
} from '../../../@types/models/users.types';
import { omit } from '../../../utils/objects';

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

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
