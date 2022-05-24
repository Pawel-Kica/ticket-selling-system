// Nest
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// Types
import { StationsWhereInput } from '../../@types/models/stations.types.dto';

export const defaultStationsTakeNumber = 10;

@Injectable()
export class StationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(where: StationsWhereInput, take = defaultStationsTakeNumber) {
    return this.prisma.station.findMany({ where, take });
  }
}
