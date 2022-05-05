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
import pureOmit from '../../../utils/pureOmit';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return pureOmit(this.prisma.user.create({ data }), ['password']);
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
