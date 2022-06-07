// Nest
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// Types
import {
  PriceCreateInput,
  PriceSelectFindMany,
  PriceUpdateInput,
  PriceWhereInput,
  PriceWhereUniqueInput,
  ValidatePriceDto,
} from '../../@types/models/prices.types.dto';
// Responses
import { NotFoundPriceException } from '../../utils/responses/errors';
import { StationsService } from '../stations/stations.service';

export const defaultPricesTakeNumber = 10;

@Injectable()
export class PricesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stationsService: StationsService,
  ) {}

  async create(data: PriceCreateInput) {
    return this.prisma.price.create({ data });
  }
  async update(where: PriceWhereUniqueInput, data: PriceUpdateInput) {
    return this.prisma.price.update({ where, data });
  }
  async findMany(where: PriceWhereInput, take = defaultPricesTakeNumber) {
    return this.prisma.price.findMany({
      where,
      select: PriceSelectFindMany,
      take,
    });
  }
  async findFirst(where: PriceWhereInput) {
    return this.prisma.price.findFirst({ where });
  }
  async findUnique(where: PriceWhereUniqueInput) {
    return this.prisma.price.findUnique({ where });
  }
  async delete(where: PriceWhereUniqueInput) {
    return this.prisma.price.delete({ where });
  }

  async validatePriceInput({
    trainType,
    carriageType,
    startStationId,
    endStationId,
  }: ValidatePriceDto) {
    if (
      !(await this.stationsService.findFirst({ id: startStationId })) ||
      !(await this.stationsService.findFirst({ id: endStationId }))
    )
      throw new NotFoundException();
    if (
      await this.findFirst({
        trainType,
        carriageType,
        startStationId,
        endStationId,
      })
    )
      throw new ConflictException();
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
