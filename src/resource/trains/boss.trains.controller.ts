// Nest
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
// Guards
import { RequireHigherRole } from '../../guards/requireRole.guard';
// Services
import { TrainsService } from './trains.service';
// Decorators
import { UserID } from '../../decorators/userID.decorator';
// Types
import { BossTrainsLookupQuery } from '../../utils/query';
import { TrainEntity } from '../../@types/models/trains.types.dto';
import { trainPrefix } from '../../prisma/seed/data/prefixes';
import { ApiSubjectNotFoundResponse } from '../../utils/swagger';

@ApiBearerAuth()
// @UseGuards(RequireHigherRole)
@ApiTags('Boss - Trains')
@Controller('boss/trains')
export class BossTrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @ApiOperation({
    description: 'Returns trains filtered by boss id',
  })
  @Get()
  async getTrains(
    @Query() { bossId }: BossTrainsLookupQuery,
    @UserID() id: string,
  ): Promise<TrainEntity[]> {
    return this.trainsService.findMany({ bossId: bossId ? bossId : id });
  }

  @ApiOperation({
    description: 'Generate detailed report about the specified train',
  })
  @ApiParam({
    name: 'id',
    description: 'Specify the id of train to generate report',
    examples: {
      seed: {
        value: `${trainPrefix}1`,
      },
      empty: {
        value: '',
      },
    },
  })
  @ApiSubjectNotFoundResponse('Train')
  @Get('report/:id')
  async getReport(@Param('id') id: string) {
    const train = await this.trainsService.generateReport({ id });
    if (!train) throw new NotFoundException();
    return train;
  }
}
