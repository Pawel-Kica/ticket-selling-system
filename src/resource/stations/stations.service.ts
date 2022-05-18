// Nest
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// Types
import { StationsWhereDto } from '../../@types/models/stations.types.dto';

@Injectable()
export class StationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(where?: StationsWhereDto) {
    return this.prisma.station.findMany({ where });
  }
}
