import { Module } from '@nestjs/common';
import { TrainsService } from './trains.service';
import { TrainsController } from './trains.controller';

@Module({
  controllers: [TrainsController],
  providers: [TrainsService]
})
export class TrainsModule {}
