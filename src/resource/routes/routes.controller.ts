// Nest
import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
// Tools
import * as moment from 'moment';
// Types
import { RoutesLookupQuery } from '../../utils/query';
import { RouteEntity } from '../../@types/models/routes.types.dto';
// Services
import { RoutesService } from './routes.service';
// Data
import {
  startStationFilter,
  endStationFilter,
  takeParam,
  uniqueIdParam,
} from '../../utils/swagger/params';
import { requestDateFormat } from '../../config/dates.config';
import { routePrefix } from '../../prisma/seed/data/prefixes';
import { ApiSubjectNotFoundResponse } from '../../utils/swagger';

@ApiTags('Public - Routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @ApiOperation({
    description: `Returns filtered routes (filtering using query params)`,
  })
  @ApiQuery(takeParam('routes', 3, 1))
  @ApiQuery(startStationFilter)
  @ApiQuery(endStationFilter)
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
    const fDate = moment(date, requestDateFormat);
    const gt = fDate.startOf('day').toISOString() ?? undefined;
    const lt = fDate.endOf('day').toISOString() ?? undefined;

    return this.routesService.findManyParamStations({
      startStationId,
      endStationId,
      departureTime: { gt, lt },
      take,
    });
  }

  @ApiOperation({
    description: `Returns unique employee`,
  })
  @ApiParam(uniqueIdParam('route', `${routePrefix}1`))
  @ApiSubjectNotFoundResponse('Route')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RouteEntity> {
    const result = await this.routesService.findUnique({ id });
    if (!result) throw new NotFoundException();
    return result;
  }
}
