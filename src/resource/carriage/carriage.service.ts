import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CarriageWhereUniqueDto } from '../../@types/models/carriage.types.dto';

@Injectable()
export class CarriagesService {
  constructor(private readonly prisma: PrismaService) {}
  async findUnique(where: CarriageWhereUniqueDto) {
    const carriage = await this.prisma.carriage.findUnique({
      where,
    });
    return carriage;
  }
}
