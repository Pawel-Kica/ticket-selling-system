// Nest
import { Module } from '@nestjs/common';
// Services
import { CarriagesService } from './carriage.service';

@Module({
  providers: [CarriagesService],
  exports: [CarriagesService],
})
export class CarriageModule {}
