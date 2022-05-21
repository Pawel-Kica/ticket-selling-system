import { Prisma } from '@prisma/client';

export type CarriageWhereUniqueInput = Prisma.CarriageWhereUniqueInput;
export type CarriageSelect = Prisma.CarriageSelect;

export const CarriageMainSelect: CarriageSelect = {
  _count: {
    select: {
      ticket: true,
    },
  },
};
