import { Prisma } from '@prisma/client';
import { Price } from './../../resource/dto/price/entities/price.entity';

export type PriceWhereInput = Prisma.PriceWhereInput;

export class PriceEntity {
  id: Price['id'];
}
