// Nest
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// Prisma
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
// Dto
import { CreateUserDto } from '../dto/user/dto/create-user.dto';
import { UserWhereUniqueDto } from '../../@types/models/users.types.dto';
// Tools
import { omit } from '../../utils/objects';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }
  async findMany() {
    return this.prisma.user.findMany();
  }
  async findUnique(where: UserWhereUniqueDto) {
    return this.prisma.user.findUnique({ where });
  }
  async update(where: UserWhereUniqueDto, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where, data });
  }
  async remove(where: UserWhereUniqueDto) {
    return this.prisma.user.delete({ where });
  }

  async checkIfUserExists(where: UserWhereUniqueDto) {
    if (!(await this.findUnique(where))) throw new NotFoundException();
  }
  async checkEmailAvailability(email: string) {
    const user = await this.findUnique({ email });
    if (user) throw new ConflictException();
    return user;
  }
  async createUserHandler(body: CreateUserDto) {
    await this.checkEmailAvailability(body.email);
    const user = await this.create(omit(body, 'passwordRepetition'));
    return this.formatUser(user);
  }

  formatUser(user: User) {
    return omit(user, 'password');
  }
}
