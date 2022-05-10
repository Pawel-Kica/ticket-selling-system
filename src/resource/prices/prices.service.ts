import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PricesWhereDto } from '../../@types/models/prices.types.dto';
import { CreatePriceDto } from '../dto/price/dto/create-price.dto';
import { UpdatePriceDto } from '../dto/price/dto/update-price.dto';

@Injectable()
export class PricesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPriceDto: CreatePriceDto) {
    return 'This action adds a new price';
  }

  findMany(where: PricesWhereDto) {
    return this.prisma.price.findMany({ where });
  }

  findOne(id: number) {
    return `This action returns a #${id} price`;
  }

  update(id: number, updatePriceDto: UpdatePriceDto) {
    return `This action updates a #${id} price`;
  }

  remove(id: number) {
    return `This action removes a #${id} price`;
  }
}
