import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as moment from 'moment';
import { RoutesLookupQuery } from '../../@types/models/routes.types.dto';
import { CreateRouteDto } from '../dto/route/dto/create-route.dto';
import { UpdateRouteDto } from '../dto/route/dto/update-route.dto';
import { RoutesService } from './routes.service';

@ApiTags('Routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  findAll(@Query() { startStationId, endStationId, date }: RoutesLookupQuery) {
    const fDate = moment(date, 'DD-MM-YYYY');
    const gt = fDate.startOf('day').toISOString() ?? undefined;
    const lt = fDate.endOf('day').toISOString() ?? undefined;
    const departureTime = { gt, lt };

    return this.routesService.findAll({
      OR: [
        {
          startStationId,
          endStationId,
          departureTime,
        },
        {
          startStationId,
          stationsBetween: {
            some: {
              id: endStationId,
            },
          },
          departureTime,
        },
        {
          endStationId,
          stationsBetween: {
            some: {
              id: startStationId,
            },
          },
          departureTime,
        },
      ],
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.routesService.findOne({ id });
    if (!result) throw new NotFoundException();
    return result;
  }
}