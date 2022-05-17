// Nest
import { Module } from '@nestjs/common';
// Controllers
import { StationsController } from './stations.controller';
// Services
import { StationsService } from './stations.service';

@Module({
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}
