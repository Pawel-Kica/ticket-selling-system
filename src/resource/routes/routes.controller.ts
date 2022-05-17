// Nest
import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// Types
import { RoutesLookupQuery } from '../../@types/models/routes.types.dto';
// Tools
import * as moment from 'moment';
// Services
import { RoutesService } from './routes.service';

@ApiTags('Public - Routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  async findMany(
    @Query() { startStationId, endStationId, date }: RoutesLookupQuery,
  ) {
    const fDate = moment(date, 'DD-MM-YYYY');
    const gt = fDate.startOf('day').toISOString() ?? undefined;
    const lt = fDate.endOf('day').toISOString() ?? undefined;

    return this.routesService.findManyParamStations({
      startStationId,
      endStationId,
      departureTime: { gt, lt },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.routesService.findUnique({ id });
    if (!result) throw new NotFoundException();
    return result;
  }
}
