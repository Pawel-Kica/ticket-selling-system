import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PriceWhereDto } from '../../@types/models/prices.types.dto';
import { InvalidRequestedBody } from '../../utils/responses/errors';
@Injectable()
export class PricesService {
  constructor(private readonly prisma: PrismaService) {}
  async findFirst(where: PriceWhereDto) {
    const price = await this.prisma.price.findFirst({ where });
    return price;
  }

  async checkPriceAvailability({
    carriageType,
    trainType,
    startStationId,
    endStationId,
  }) {
    const price = await this.findFirst({
      carriageType,
      trainType,
      startStationId,
      endStationId,
    });
    if (!price)
      throw new InvalidRequestedBody('Something went wrong, try again later');
  }
}
