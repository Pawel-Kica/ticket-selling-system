import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrainsLookupQuery } from '../../@types/models/trains.types.dto';
import { TrainsService } from './trains.service';

@ApiTags('Trains')
@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Get()
  findAll(@Query() { routeId }: TrainsLookupQuery) {
    return this.trainsService.findAll({ routeId });
  }
}
