import { Module } from '@nestjs/common';
import { BossService } from './boss.service';
import { BossController } from './controllers/boss.controller';
import { UsersModule } from '../users/users.module';
import { TrainsModule } from '../trains/trains.module';
import { BossTrainsController } from './controllers/boss.trains.controller';

@Module({
  imports: [UsersModule, TrainsModule],
  controllers: [BossController, BossTrainsController],
  providers: [BossService],
})
export class BossModule {}
