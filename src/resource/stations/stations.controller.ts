import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsLookupQuery } from '../../@types/models/stations.types.dto';
import { RouteMainSelect } from '../../@types/models/routes.types.dto';

@ApiTags('Public - Stations')
@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  async findMany(@Query() { stationId }: StationsLookupQuery) {
    return this.stationsService.findMany(
      {
        id: stationId,
      },
      {
        id: true,
        name: true,
        routeStartStations: {
          select: RouteMainSelect,
        },
      },
    );
  }
}
