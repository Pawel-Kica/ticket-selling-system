import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  RouteMainSelect,
  RouteSelectDto,
  RouteWhereDto,
  RouteWhereUniqueInput,
} from '../../@types/models/routes.types.dto';
import * as moment from 'moment';

@Injectable()
export class RoutesService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where?: RouteWhereDto, select: RouteSelectDto = RouteMainSelect) {
    return this.prisma.route.findMany({
      where,
      select,
    });
  }

  findUnique(
    where: RouteWhereUniqueInput,
    select: RouteSelectDto = RouteMainSelect,
  ) {
    return this.prisma.route.findUnique({ where, select });
  }

  findManyWithStations({
    startStationId,
    endStationId,
    departureTime = {
      gt: moment().add(3, 'd').toISOString(),
    },
  }: {
    startStationId: string;
    endStationId: string;
    departureTime?: {
      gt?: string;
      lt?: string;
    };
  }) {
    return this.findMany({
      OR: [
        {
          startStationId,
          endStationId,
          departureTime,
        },
        {
          startStationId,
          stationsBetween: {
            some: {
              stationId: endStationId,
              departureTime,
            },
          },
        },
        {
          AND: [
            {
              stationsBetween: {
                some: {
                  stationId: startStationId,
                  departureTime,
                },
              },
            },
            {
              stationsBetween: {
                some: {
                  stationId: endStationId,
                },
              },
            },
          ],
        },
        {
          stationsBetween: {
            some: {
              stationId: startStationId,
              departureTime,
            },
          },
          endStationId,
        },
      ],
    });
  }
}
