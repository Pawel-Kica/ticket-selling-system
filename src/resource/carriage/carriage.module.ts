import { Module } from '@nestjs/common';
import { CarriagesService } from './carriage.service';
import { CarriageController } from './carriage.controller';

@Module({
  controllers: [CarriageController],
  providers: [CarriagesService],
  exports: [CarriagesService],
})
export class CarriageModule {}
