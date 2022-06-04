import { ApiProperty } from '@nestjs/swagger';
import { CarriageType, Prisma, TrainType } from '@prisma/client';
import { IsEnum, IsInt, IsString, Min } from 'class-validator';
import { Price } from './../../resource/dto/price/entities/price.entity';

export type PriceCreateInput = Prisma.PriceCreateInput;
export type PriceUpdateInput = Prisma.PriceUpdateInput;
export type PriceWhereInput = Prisma.PriceWhereInput;
export type PriceWhereUniqueInput = Prisma.PriceWhereUniqueInput;

export class ValidatePriceDto {
  @ApiProperty({ enum: TrainType })
  @IsEnum(TrainType)
  trainType: TrainType;
  @ApiProperty({ enum: CarriageType })
  @IsEnum(CarriageType)
  carriageType: CarriageType;
  @IsString()
  startStationId: Price['startStationId'];
  @IsString()
  endStationId: Price['endStationId'];
}
export class CreatePriceDto extends ValidatePriceDto {
  @IsInt()
  @Min(1)
  value: Price['value'];
}

export class UpdatePriceDto {
  @IsInt()
  @Min(1)
  value: Price['value'];
}
export class PriceEntity {
  id: Price['id'];
  startStationId: Price['startStationId'];
  endStationId: Price['endStationId'];
  @ApiProperty({ enum: TrainType })
  trainType: Price['trainType'];
  @ApiProperty({ enum: CarriageType })
  carriageType: Price['carriageType'];
  value: Price['value'];
}
