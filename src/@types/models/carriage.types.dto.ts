import { ApiProperty } from '@nestjs/swagger';
import { Carriage, CarriageType, Prisma } from '@prisma/client';

export type CarriageWhereUniqueInput = Prisma.CarriageWhereUniqueInput;
export type CarriageSelect = Prisma.CarriageSelect;

export const carriageInfoSelect = {
  id: true,
  type: true,
  numberOfSeats: true,
  _count: {
    select: {
      ticket: true,
    },
  },
};

export class CarriageSeatsDto {
  id: Carriage['id'];
  @ApiProperty({ enum: CarriageType })
  type: CarriageType;
  numberOfSeats: Carriage['numberOfSeats'];
}
export class CarriageInfoDto extends CarriageSeatsDto {
  _count: {
    ticket: number;
  };
}
