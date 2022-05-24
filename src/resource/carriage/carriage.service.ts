// Nest
import { Injectable } from '@nestjs/common';
// Prisma
import { PrismaService } from 'nestjs-prisma';
// Types
import { CarriageType } from '@prisma/client';
import { CarriageWhereUniqueInput } from '../../@types/models/carriage.types.dto';
// Responses
import {
  InvalidCarriageIdException,
  InvalidSeatNumberException,
  InvalidTrainIdException,
} from '../../utils/responses/errors';

@Injectable()
export class CarriagesService {
  constructor(private readonly prisma: PrismaService) {}
  async findUnique(where: CarriageWhereUniqueInput) {
    return this.prisma.carriage.findUnique({
      where,
    });
  }

  async validateCarriage({
    carriageId,
    trainId,
    seat,
  }: {
    carriageId: string;
    trainId: string;
    seat: number;
  }) {
    const carriage = await this.findUnique({
      id: carriageId,
    });

    if (!carriage) throw new InvalidCarriageIdException();

    if (carriage.trainId !== trainId) throw new InvalidTrainIdException();

    if (seat > 20 && carriage.type === CarriageType.comfort)
      throw new InvalidSeatNumberException();

    return carriage;
  }
}
