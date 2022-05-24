import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PricesLookupQuery } from '../../utils/query';
import {
  endStationIdParam,
  startStationIdParam,
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
  @ApiQuery(startStationIdParam)
  @ApiQuery(endStationIdParam)
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
    }: PricesLookupQuery,
  ) {
    return await this.pricesService.findMany(
      { startStationId, endStationId, carriageType, trainType },
      (take = take > 50 ? 50 : take),
    );
  }
}
