// Nest
import { Module } from '@nestjs/common';
// Controllers
import { RoutesController } from './routes.controller';
// Services
import { RoutesService } from './routes.service';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService],
  exports: [RoutesService],
})
export class RoutesModule {}
