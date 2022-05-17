// Nest
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
// Services
import { StationsService } from './stations.service';

@ApiTags('Public - stations')
@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  async findMany() {
    return this.stationsService.findMany();
  }
}
