import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { UsersModule } from '../users/users.module';
import { CarriageModule } from '../carriage/carriage.module';
import { TrainsModule } from '../trains/trains.module';
import { RoutesModule } from '../routes/routes.module';

@Module({
  imports: [UsersModule, CarriageModule, TrainsModule, RoutesModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
