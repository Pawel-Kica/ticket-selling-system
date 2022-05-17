import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import * as moment from 'moment';
import { ApiTags } from '@nestjs/swagger';
import { RoutesLookupQuery } from '../../@types/models/routes.types.dto';
import { RoutesService } from './routes.service';

@ApiTags('Public - Routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  findMany(@Query() { startStationId, endStationId, date }: RoutesLookupQuery) {
    const fDate = moment(date, 'DD-MM-YYYY');
    const gt = fDate.startOf('day').toISOString() ?? undefined;
    const lt = fDate.endOf('day').toISOString() ?? undefined;
    const departureTime = { gt, lt };

    return this.routesService.findManyWithStations({
      startStationId,
      endStationId,
      departureTime,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.routesService.findUnique({ id });
    if (!result) throw new NotFoundException();
    return result;
  }
}
