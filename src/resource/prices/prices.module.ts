// Nest
import { Module } from '@nestjs/common';
// Controllers
import { PricesController } from './prices.controller';
// Services
import { PricesService } from './prices.service';

@Module({
  controllers: [PricesController],
  providers: [PricesService],
  exports: [PricesService],
})
export class PricesModule {}
