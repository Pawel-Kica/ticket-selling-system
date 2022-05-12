import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  RouteBasicSelect,
  RouteSelectDto,
  RouteWhereDto,
  RouteWhereUniqueInput,
} from '../../@types/models/routes.types.dto';
import { CreateRouteDto } from '../dto/route/dto/create-route.dto';
import { UpdateRouteDto } from '../dto/route/dto/update-route.dto';

@Injectable()
export class RoutesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRouteDto: CreateRouteDto) {
    return 'This action adds a new route';
  }

  findAll(where?: RouteWhereDto, select: RouteSelectDto = RouteBasicSelect) {
    return this.prisma.route.findMany({
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

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
