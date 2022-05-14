import { Prisma } from '@prisma/client';

export type CarriageWhereUniqueDto = Prisma.CarriageWhereUniqueInput;
export type CarriageSelectDto = Prisma.CarriageSelect;

export const CarriageBasicSelect = {
  _count: {
    select: {
      ticket: true,
    },
  },
};
