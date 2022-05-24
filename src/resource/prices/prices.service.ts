// Nest
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// Types
import { PriceWhereInput } from '../../@types/models/prices.types.dto';
// Responses
import { NotFoundPriceException } from './../../utils/responses/errors';

export const defaultPricesTakeNumber = 10;

@Injectable()
export class PricesService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(where: PriceWhereInput, take = defaultPricesTakeNumber) {
    return this.prisma.price.findMany({ where, take });
  }
  async findFirst(where: PriceWhereInput) {
    return this.prisma.price.findFirst({ where });
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
    if (!price) throw new NotFoundPriceException();
  }
}
