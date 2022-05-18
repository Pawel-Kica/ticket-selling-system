// Nest
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
// Services
import { StationsService } from './stations.service';
import { StationEntity } from '../../@types/models/stations.types.dto';

@ApiTags('Public - stations')
@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  async findMany(): Promise<StationEntity[]> {
    return this.stationsService.findMany();
  }
}
