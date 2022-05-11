import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import * as moment from 'moment';
import { RoutesLookupQuery } from '../../@types/models/routes.types.dto';
import { CreateRouteDto } from '../dto/route/dto/create-route.dto';
import { UpdateRouteDto } from '../dto/route/dto/update-route.dto';
import { RoutesService } from './routes.service';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Get()
  findAll(@Query() { startStationId, endStationId, date }: RoutesLookupQuery) {
    const fDate = moment(date, 'DD-MM-YYYY');

    const gt = fDate.startOf('day').toISOString();
    const lt = fDate.endOf('day').toISOString();

    return this.routesService.findAll({
      startStationId,
      endStationId,
      departureTime: {
        gt,
        lt,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }
}
