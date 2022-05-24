import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { stationPrefix } from '../../prisma/seed/data/prefixes';
import { PricesLookupQuery } from '../../utils/query';
import { defaultPricesTakeNumber, PricesService } from './prices.service';

@ApiTags('Public - Prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @ApiOperation({
    description: `Returns filtered prices (filtering using query params)`,
  })
  @ApiQuery({
    name: 'take',
    description: 'Specify the number of prices you want to receive (max 50)',
    examples: {
      empty: {
        value: '',
      },
      default: {
        value: defaultPricesTakeNumber,
      },
      example: {
        value: 3,
      },
    },
    required: false,
  })
  @ApiQuery({
    name: 'startStationId',
    description: 'Filter by startStationId property',
    examples: {
      empty: {
        value: '',
      },
      seed: {
        value: `${stationPrefix}1`,
      },
    },
    required: false,
  })
  @ApiQuery({
    name: 'endStationId',
    description: 'Filter by endStationId property',
    examples: {
      empty: {
        value: '',
      },
      seed: {
        value: `${stationPrefix}3`,
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
    }: PricesLookupQuery,
  ) {
    return await this.pricesService.findMany(
      { startStationId, endStationId, carriageType, trainType },
      (take = take > 50 ? 50 : take),
    );
  }
}
