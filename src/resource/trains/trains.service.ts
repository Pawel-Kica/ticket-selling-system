import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  TrainBasicSelect,
  TrainWhereDto,
  TrainWhereUniqueDto,
} from '../../@types/models/trains.types.dto';

@Injectable()
export class TrainsService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: TrainWhereDto, select = TrainBasicSelect) {
    return this.prisma.train.findMany({ where, select });
  }

  findUnique(where: TrainWhereUniqueDto, select = TrainBasicSelect) {
    return this.prisma.train.findUnique({ where, select });
  }
}
