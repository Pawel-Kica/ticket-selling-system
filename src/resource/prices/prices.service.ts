// Nest
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// Types
import { PriceWhereInput } from '../../@types/models/prices.types.dto';
// Responses
import { InvalidRequestedBody } from '../../utils/responses/errors';
@Injectable()
export class PricesService {
  constructor(private readonly prisma: PrismaService) {}

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
    if (!price)
      throw new InvalidRequestedBody(
        'We are not selling tickets for this route yet, try again later',
      );
  }
}
