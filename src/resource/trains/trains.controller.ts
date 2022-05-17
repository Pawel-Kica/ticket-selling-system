import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrainsLookupQuery } from '../../@types/models/trains.types.dto';
import { TrainsService } from './trains.service';

@ApiTags('Public - Trains')
@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Get()
  findMany(@Query() { routeId }: TrainsLookupQuery) {
    return this.trainsService.findMany({ routeId });
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    const train = await this.trainsService.findUnique({ id });
    if (!train) throw new NotFoundException();

    return train;
  }
}
