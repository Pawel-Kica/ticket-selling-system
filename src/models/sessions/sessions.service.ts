import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateSessionDto } from '../../@types/models/sessions.types';
@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSessionDto: CreateSessionDto) {
    createSessionDto;
    return 'This action adds a new session';
  }

  findAll() {
    return `This action returns all sessions`;
  }

  findUnique(where: Prisma.SessionWhereUniqueInput) {
    return this.prisma.session.findUnique({ where });
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
