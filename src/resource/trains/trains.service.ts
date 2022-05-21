import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  TrainMainSelect,
  TrainWhereDto,
  TrainWhereUniqueDto,
} from '../../@types/models/trains.types.dto';

@Injectable()
export class TrainsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(where?: TrainWhereDto) {
    return this.prisma.train.findMany({ where });
  }
  async findUnique(where: TrainWhereUniqueDto) {
    return this.prisma.train.findUnique({ where });
  }
  async findUniqueIncludeDetails(where: TrainWhereUniqueDto) {
    return this.prisma.train.findUnique({ where, select: TrainMainSelect });
  }
}
