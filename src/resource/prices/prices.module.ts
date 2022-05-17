// Nest
import { Module } from '@nestjs/common';
// Services
import { PricesService } from './prices.service';

@Module({
  providers: [PricesService],
  exports: [PricesService],
})
export class PricesModule {}
