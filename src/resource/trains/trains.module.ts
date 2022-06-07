// Nest
import { Module } from '@nestjs/common';
// Controllers
import { TrainsController } from './trains.controller';
// Services
import { TrainsService } from './trains.service';

@Module({
  controllers: [TrainsController],
  providers: [TrainsService],
  exports: [TrainsService],
})
export class TrainsModule {}
