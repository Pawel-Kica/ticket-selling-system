// Nest
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
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
import { trainPrefix } from '../../prisma/seed/data/prefixes';
import { uniqueIdParam } from '../../utils/swagger/params';

@ApiTags('Public - Trains')
@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @ApiOperation({
    description: `Returns filtered trains (filtering using query params)`,
  })
  @ApiQuery({
    name: 'routeId',
    description: `Specify the ID of route`,
    examples: {
      empty: {
        value: '',
      },
      valid: {
        value: 'route2',
      },
    },
    required: false,
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
  @ApiParam(uniqueIdParam('train', `${trainPrefix}1`))
  @ApiSubjectNotFoundResponse('Train')
  @Get(':id')
  async findUnique(@Param('id') id: string): Promise<TrainDetailsDto> {
    const train = await this.trainsService.findUniqueIncludeDetails({ id });
    if (!train) throw new NotFoundException();

    return train;
  }
}
