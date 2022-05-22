// Nest
import { Module } from '@nestjs/common';
// Modules
import { UsersModule } from '../users/users.module';
// Controllers
import { TrainsController } from './trains.controller';
import { BossTrainsController } from './boss.trains.controller';
// Services
import { TrainsService } from './trains.service';

@Module({
  imports: [UsersModule],
  controllers: [TrainsController, BossTrainsController],
  providers: [TrainsService],
  exports: [TrainsService],
})
export class TrainsModule {}
