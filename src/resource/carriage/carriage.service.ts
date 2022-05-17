import { Injectable } from '@nestjs/common';
import { CarriageType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CarriageWhereUniqueDto } from '../../@types/models/carriage.types.dto';
import { InvalidRequestedBody } from '../../utils/responses/errors';

@Injectable()
export class CarriagesService {
  constructor(private readonly prisma: PrismaService) {}
  async findUnique(where: CarriageWhereUniqueDto) {
    const carriage = await this.prisma.carriage.findUnique({
      where,
    });
    return carriage;
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

    if (!carriage) throw new InvalidRequestedBody('Invalid carriage id');

    if (carriage.trainId !== trainId)
      throw new InvalidRequestedBody('Invalid train id');

    if (seat > 20 && carriage.type === CarriageType.comfort)
      throw new InvalidRequestedBody('Invalid seat number');

    return carriage;
  }
}
