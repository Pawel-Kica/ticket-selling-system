import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { PricesLookupQuery } from '../../@types/models/prices.types.dto';

@ApiTags('Prices')
@Controller('prices')
export class PricesController {
  @Get()
  async findMany(@Query() query: PricesLookupQuery) {
    console.log(query);
    return [];
  }
}
