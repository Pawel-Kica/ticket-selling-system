import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PricesLookupQuery } from '../../utils/query';
import {
  endStationFilter,
  priceGreaterThan,
  priceLowerThanFilter,
  startStationFilter,
  takeParam,
} from '../../utils/swagger/params';
import { defaultPricesTakeNumber, PricesService } from './prices.service';

@ApiTags('Public - Prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @ApiOperation({
    description: `Returns filtered prices (filtering using query params)`,
  })
  @ApiQuery(takeParam('prices', defaultPricesTakeNumber, 3))
  @ApiQuery(startStationFilter)
  @ApiQuery(endStationFilter)
  @ApiQuery(priceGreaterThan)
  @ApiQuery(priceLowerThanFilter)
  @ApiQuery({
    name: 'carriageType',
    description: 'Filter by carriageType property',
    required: false,
  })
  @ApiQuery({
    name: 'trainType',
    description: 'Filter by trainType property',
    required: false,
  })
  @Get()
  async findMany(
    @Query()
    {
      startStationId,
      endStationId,
      carriageType,
      trainType,
      take,
      priceLowerThan,
      priceGreaterThan,
    }: PricesLookupQuery,
  ) {
    return await this.pricesService.findMany(
      {
        startStationId,
        endStationId,
        carriageType,
        trainType,
        value: {
          gt: priceGreaterThan,
          lt: priceLowerThan,
        },
      },
      (take = take > 50 ? 50 : take),
    );
  }
}
