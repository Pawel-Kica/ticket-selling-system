// Nest
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// Types
import {
  RouteMainSelect,
  RouteSelectDto,
  RouteWhereDto,
  RouteWhereUniqueInput,
} from '../../@types/models/routes.types.dto';
// Tools
import * as moment from 'moment';
// Responses
import { InvalidRequestedBody } from '../../utils/responses/errors';

@Injectable()
export class RoutesService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(where: RouteWhereDto, select = RouteMainSelect) {
    return this.prisma.route.findMany({
      where,
      select,
    });
  }

  async findUnique(
    where: RouteWhereUniqueInput,
    select: RouteSelectDto = RouteMainSelect,
  ) {
    return this.prisma.route.findUnique({ where, select });
  }

  async findManyParamStations({
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
      RouteMainSelect,
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
    });
    if (!routes.length) throw new InvalidRequestedBody('Invalid stations');
  }
}
