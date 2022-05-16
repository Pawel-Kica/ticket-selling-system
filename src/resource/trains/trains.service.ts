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

  findMany(where: TrainWhereDto, select = TrainMainSelect) {
    return this.prisma.train.findMany({ where, select });
  }

  findUnique(where: TrainWhereUniqueDto, select = TrainMainSelect) {
    return this.prisma.train.findUnique({ where, select });
  }
}
