import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.user.controller';
import { UsersModule } from '../users/users.module';
import { CarriageModule } from '../carriage/carriage.module';
import { TrainsModule } from '../trains/trains.module';
import { RoutesModule } from '../routes/routes.module';
import { PricesModule } from '../prices/prices.module';
import { TicketsManagerController } from './tickets.manager.controller';

@Module({
  imports: [
    UsersModule,
    CarriageModule,
    TrainsModule,
    RoutesModule,
    PricesModule,
  ],
  controllers: [TicketsController, TicketsManagerController],
  providers: [TicketsService],
})
export class TicketsModule {}
