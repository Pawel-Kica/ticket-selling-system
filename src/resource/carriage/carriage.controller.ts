import { Controller } from '@nestjs/common';
import { CarriagesService } from './carriage.service';

@Controller('carriage')
export class CarriageController {
  constructor(private readonly carriageService: CarriagesService) {}
}
