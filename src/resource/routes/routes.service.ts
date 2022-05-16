import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  RouteMainSelect,
  RouteSelectDto,
  RouteWhereDto,
  RouteWhereUniqueInput,
} from '../../@types/models/routes.types.dto';

@Injectable()
export class RoutesService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where?: RouteWhereDto, select = RouteMainSelect) {
    return this.prisma.route.findMany({
      where,
      select,
    });
  }

  findFirst(where?: RouteWhereDto, select = RouteMainSelect) {
    return this.prisma.route.findFirst({
      where,
      select,
    });
  }

  findOne(
    where: RouteWhereUniqueInput,
    select: RouteSelectDto = RouteMainSelect,
  ) {
    return this.prisma.route.findUnique({ where, select });
  }
}
