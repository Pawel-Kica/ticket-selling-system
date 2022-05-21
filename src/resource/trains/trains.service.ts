import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  trainDetailsSelect,
  TrainWhereInput,
  TrainWhereUniqueInput,
} from '../../@types/models/trains.types.dto';

@Injectable()
export class TrainsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(where?: TrainWhereInput) {
    return this.prisma.train.findMany({
      where,
      orderBy: {
        id: 'asc',
      },
    });
  }
  async findUnique(where: TrainWhereUniqueInput) {
    return this.prisma.train.findUnique({ where });
  }
  async findUniqueIncludeDetails(where: TrainWhereUniqueInput) {
    return this.prisma.train.findUnique({ where, select: trainDetailsSelect });
  }
}
