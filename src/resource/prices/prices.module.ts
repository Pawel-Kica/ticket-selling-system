// Nest
import { Module } from '@nestjs/common';
import { StationsModule } from '../stations/stations.module';
// Controllers
import { PricesController } from './prices.controller';
// Services
import { PricesService } from './prices.service';

@Module({
  imports: [StationsModule],
  controllers: [PricesController],
  providers: [PricesService],
  exports: [PricesService],
})
export class PricesModule {}
