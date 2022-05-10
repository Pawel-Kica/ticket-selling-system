import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { StationsService } from './stations.service';

@ApiTags('Stations')
@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  async findMany() {
    return this.stationsService.findMany();
  }
}
