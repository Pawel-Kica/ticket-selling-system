import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PriceWhereDto } from '../../@types/models/prices.types.dto';
@Injectable()
export class PricesService {
  constructor(private readonly prisma: PrismaService) {}
  async firdFirst(where: PriceWhereDto) {
    const price = await this.prisma.price.findFirst({ where });
    return price;
  }
}
