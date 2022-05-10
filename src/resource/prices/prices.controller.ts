import { ApiTags } from '@nestjs/swagger';
import { PricesService } from './prices.service';
import { Controller, Get, Query } from '@nestjs/common';
import { PricesLookupQuery } from '../../@types/models/prices.types.dto';
import { InvalidQueryParameterException } from '../../utils/responses/errors';

@ApiTags('Prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get()
  async findMany(@Query() query: PricesLookupQuery) {
    return [];
  }
}
