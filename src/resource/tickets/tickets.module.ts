// Nest
import { Module } from '@nestjs/common';
// Modules
import { UsersModule } from '../users/users.module';
import { TrainsModule } from '../trains/trains.module';
import { RoutesModule } from '../routes/routes.module';
import { PricesModule } from '../prices/prices.module';
import { CarriageModule } from '../carriage/carriage.module';
// Controllers
import { TicketsController } from './tickets.user.controller';
// Services
import { TicketsService } from './tickets.service';

@Module({
  imports: [
    UsersModule,
    CarriageModule,
    TrainsModule,
    RoutesModule,
    PricesModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
