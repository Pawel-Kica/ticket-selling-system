// Nest
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// Types
import {
  StationCreateInput,
  StationWhereInput,
  StationWhereUniqueInput,
} from '../../@types/models/stations.types.dto';

export const defaultStationsTakeNumber = 10;

@Injectable()
export class StationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: StationCreateInput) {
    if (await this.findFirst({ name: data.name }))
      throw new ConflictException();
    return this.prisma.station.create({ data });
  }
  async delete(where: StationWhereUniqueInput) {
    if (!(await this.findFirst(where))) throw new NotFoundException();
    return this.prisma.station.delete({ where });
  }
  async findFirst(where: StationWhereInput) {
    return this.prisma.station.findFirst({ where });
  }
  async findMany(where: StationWhereInput, take = defaultStationsTakeNumber) {
    return this.prisma.station.findMany({ where, take });
  }

  async findUnique(where: StationWhereUniqueInput) {
    const station = await this.prisma.station.findUnique({
      where,
      select: {
        id: true,
        name: true,
        routeStartStations: {
          select: {
            id: true,
            startStation: true,
            departureTime: true,
            endStation: true,
            arrivalTime: true,
          },
        },
        routeEndStations: {
          select: {
            id: true,
            startStation: true,
            departureTime: true,
            endStation: true,
            arrivalTime: true,
          },
        },
        routeStationsBetween: {
          select: {
            routeId: true,
            departureTime: true,
            arrivalTime: true,
            order: true,
            route: {
              select: {
                startStation: true,
                departureTime: true,
                endStation: true,
                arrivalTime: true,
              },
            },
          },
        },
      },
    });
    if (!station) throw new NotFoundException();
    return station;
  }
}
