import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  RouteBasicSelect,
  RouteSelectDto,
  RouteWhereDto,
  RouteWhereUniqueInput,
} from '../../@types/models/routes.types.dto';

@Injectable()
export class RoutesService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where?: RouteWhereDto, select = RouteBasicSelect) {
    return this.prisma.route.findMany({
      where,
      select,
    });
  }

  findFirst(where?: RouteWhereDto, select = RouteBasicSelect) {
    return this.prisma.route.findFirst({
      where,
      select,
    });
  }

  findOne(
    where: RouteWhereUniqueInput,
    select: RouteSelectDto = RouteBasicSelect,
  ) {
    return this.prisma.route.findUnique({ where, select });
  }
}
