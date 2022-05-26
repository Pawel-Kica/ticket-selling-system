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

  async generateReport(where: TrainWhereUniqueInput) {
    return this.prisma.train.findUnique({
      where,
      select: {
        boss: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            documentType: true,
            documentNumber: true,
            role: true,
            blocked: false,
          },
        },
        driver: true,
        driverHelper: true,
        route: {
          select: {
            id: true,
            departureTime: true,
            startStation: true,
            stationsBetween: true,
            arrivalTime: true,
            endStation: true,
          },
        },
        carriage: {
          select: {
            id: true,
            numberOfSeats: true,
            type: true,
            conductor1: true,
            conductor2: true,
            ticket: {
              select: {
                seat: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    surname: true,
                    email: true,
                    documentType: true,
                    documentNumber: true,
                    role: true,
                    blocked: false,
                  },
                },
                state: true,
                startStation: true,
                endStation: true,
              },
            },
          },
        },
      },
    });
  }
}
