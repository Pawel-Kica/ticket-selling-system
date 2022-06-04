// Nest
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
// Services
import { TrainsService } from './trains.service';
import {
  TrainDetailsDto,
  TrainEntity,
} from '../../@types/models/trains.types.dto';
import { LookupByRouteId } from '../../utils/query/index.types';
import { ApiSubjectNotFoundResponse } from '../../utils/swagger';

@ApiTags('Public - Trains')
@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @ApiOperation({
    description: `Returns filtered trains (filtering using query params)`,
  })
  @Get()
  async findMany(
    @Query() { routeId }: LookupByRouteId,
  ): Promise<TrainEntity[]> {
    return this.trainsService.findMany({ routeId });
  }

  @ApiOperation({
    description: `Returns unique train`,
  })
  @ApiSubjectNotFoundResponse('Train')
  @Get(':id')
  async findUnique(@Param('id') id: string): Promise<TrainDetailsDto> {
    const train = await this.trainsService.findUniqueIncludeDetails({ id });
    if (!train) throw new NotFoundException();

    return train;
  }
}
