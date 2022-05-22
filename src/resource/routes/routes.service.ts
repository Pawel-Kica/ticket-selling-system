// Nest
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// Types
import {
  routeMainSelect,
  RouteWhereInput,
  RouteWhereUniqueInput,
} from '../../@types/models/routes.types.dto';
// Responses
import { InvalidRequestedBody } from '../../utils/responses/errors';
// Config
import { gtTimeLimit } from '../../config/dates.config';

@Injectable()
export class RoutesService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(where: RouteWhereInput, select = routeMainSelect) {
    return this.prisma.route.findMany({
      where,
      select,
    });
  }
  async findUnique(where: RouteWhereUniqueInput, select = routeMainSelect) {
    return this.prisma.route.findUnique({ where, select });
  }

  async findManyParamStations({
    startStationId,
    endStationId,
    departureTime,
  }: {
    startStationId: string;
    endStationId: string;
    departureTime?: {
      gt?: string;
      lt?: string;
    };
  }) {
    return this.findMany(
      {
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
      },
      routeMainSelect,
    );
  }

  async validateRoute({
    startStationId,
    endStationId,
  }: {
    startStationId: string;
    endStationId: string;
  }) {
    const routes = await this.findManyParamStations({
      startStationId,
      endStationId,
      departureTime: {
        gt: gtTimeLimit,
      },
    });
    if (!routes.length) throw new InvalidRequestedBody('Invalid stations');
  }
}
