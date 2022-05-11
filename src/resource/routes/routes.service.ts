import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RouteWhereDto } from '../../@types/models/routes.types.dto';
import { CreateRouteDto } from '../dto/route/dto/create-route.dto';
import { UpdateRouteDto } from '../dto/route/dto/update-route.dto';

@Injectable()
export class RoutesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRouteDto: CreateRouteDto) {
    return 'This action adds a new route';
  }

  findAll(where: RouteWhereDto = {}) {
    return this.prisma.route.findMany({
      where,
      include: {
        startStation: true,
        stationsBetween: true,
        endStation: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
