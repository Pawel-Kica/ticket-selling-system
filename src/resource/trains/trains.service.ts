import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  TrainBasicSelect,
  TrainWhereDto,
  TrainWhereUniqueDto,
} from '../../@types/models/trains.types.dto';
import { CreateTrainDto } from '../dto/train/dto/create-train.dto';
import { UpdateTrainDto } from '../dto/train/dto/update-train.dto';

@Injectable()
export class TrainsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTrainDto: CreateTrainDto) {
    return 'This action adds a new train';
  }

  findAll(where: TrainWhereDto, select = TrainBasicSelect) {
    return this.prisma.train.findMany({ where, select });
  }

  findOne(where: TrainWhereUniqueDto, select = TrainBasicSelect) {
    return this.prisma.train.findUnique({ where, select });
  }

  update(id: number, updateTrainDto: UpdateTrainDto) {
    return `This action updates a #${id} train`;
  }

  remove(id: number) {
    return `This action removes a #${id} train`;
  }
}
