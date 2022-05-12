import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  StationsSelectDto,
  StationsWhereDto,
} from '../../@types/models/stations.types.dto';

@Injectable()
export class StationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(where: StationsWhereDto, select?: StationsSelectDto) {
    return this.prisma.station.findMany({ where, select });
  }
}
