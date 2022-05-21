import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PricesLookupQuery } from '../../utils/query';
import { PricesService } from './prices.service';

@ApiTags('Public - Prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get()
  async findMany(
    @Query()
    {
      startStationId,
      endStationId,
      carriageType,
      trainType,
      take,
    }: PricesLookupQuery,
  ) {
    return await this.pricesService.findMany(
      { startStationId, endStationId, carriageType, trainType },
      (take = take > 50 ? 50 : take),
    );
  }
}
