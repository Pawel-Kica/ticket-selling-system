// Nest
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
// Guards
import { RequireHigherRole } from '../../guards/requireRole.guard';
// Services
import { TrainsService } from './trains.service';
// Decorators
import { UserID } from '../../decorators/userID.decorator';
// Types
import { BossTrainsLookupQuery } from '../../utils/query';

@ApiBearerAuth()
@UseGuards(RequireHigherRole)
@ApiTags('Boss - Trains')
@Controller('boss')
export class BossTrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Get('trains')
  async getTrains(
    @Query() { bossId }: BossTrainsLookupQuery,
    @UserID() id: string,
  ) {
    return this.trainsService.findMany({ bossId: bossId ? bossId : id });
  }
}
