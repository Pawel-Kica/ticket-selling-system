import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  TrainMainSelect,
  TrainSelectDto,
  TrainWhereDto,
  TrainWhereUniqueDto,
} from '../../@types/models/trains.types.dto';

@Injectable()
export class TrainsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(where?: TrainWhereDto, select?: TrainSelectDto) {
    return this.prisma.train.findMany({ where, select });
  }

  async findUnique(where: TrainWhereUniqueDto, select = TrainMainSelect) {
    return this.prisma.train.findUnique({ where, select });
  }
}
