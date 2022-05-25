// Nest
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
// Guards
import { RequireHigherRole } from '../../guards/requireRole.guard';
// Services
import { TrainsService } from './trains.service';
// Decorators
import { UserID } from '../../decorators/userID.decorator';
// Types
import { BossTrainsLookupQuery } from '../../utils/query';
import { TrainEntity } from '../../@types/models/trains.types.dto';

@ApiBearerAuth()
@UseGuards(RequireHigherRole)
@ApiTags('Boss - Trains')
@Controller('boss')
export class BossTrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @ApiOperation({
    description: 'Returns trains filtered by boss id',
  })
  @Get('trains')
  async getTrains(
    @Query() { bossId }: BossTrainsLookupQuery,
    @UserID() id: string,
  ): Promise<TrainEntity[]> {
    return this.trainsService.findMany({ bossId: bossId ? bossId : id });
  }
}
