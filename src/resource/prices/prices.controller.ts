import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PriceFindManyEntity } from '../../@types/models/prices.types.dto';
import { PricesLookupQuery } from '../../utils/query/index.types';
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
    name: 'id',
    description: `Specify the ID of price to be found`,
    examples: {
      empty: {
        value: '',
      },
      valid: {
        value: 'price1',
      },
      notFound: {
        summary: 'not found',
        value: '123',
      },
    },
    required: false,
  })
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
      id,
    }: PricesLookupQuery,
  ): Promise<PriceFindManyEntity[]> {
    return await this.pricesService.findMany(
      {
        id,
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
