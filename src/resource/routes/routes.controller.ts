// Nest
import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
// Tools
import * as moment from 'moment';
// Types
import { RoutesLookupQuery } from '../../utils/query';
import { RouteEntity } from '../../@types/models/routes.types.dto';
// Services
import { RoutesService } from './routes.service';
// Data
import {
  startStationIdParam,
  endStationIdParam,
  takeParam,
} from '../../utils/responses/swagger/params';
import { requestDateFormat } from '../../config/dates.config';

@ApiTags('Public - Routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @ApiQuery(takeParam('routes', 3, 1))
  @ApiQuery(startStationIdParam)
  @ApiQuery(endStationIdParam)
  @ApiQuery({
    name: 'date',
    description: 'Filter by date property',
    examples: {
      empty: {
        value: '',
      },
      seed: {
        value: moment().add(2, 'd').format(requestDateFormat),
      },
    },
    required: false,
  })
  @Get()
  async findMany(
    @Query() { startStationId, endStationId, date, take }: RoutesLookupQuery,
  ): Promise<RouteEntity[]> {
    console.log(date);
    const fDate = moment(date, requestDateFormat);
    const gt = fDate.startOf('day').toISOString() ?? undefined;
    const lt = fDate.endOf('day').toISOString() ?? undefined;
    console.log(fDate);
    console.log(gt, lt);

    return this.routesService.findManyParamStations({
      startStationId,
      endStationId,
      departureTime: { gt, lt },
      take,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RouteEntity> {
    const result = await this.routesService.findUnique({ id });
    if (!result) throw new NotFoundException();
    return result;
  }
}
