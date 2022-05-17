// Nest
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
// Services
import { TrainsService } from './trains.service';

@ApiTags('Public - Trains')
@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Get()
  async findMany() {
    return this.trainsService.findMany();
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    const train = await this.trainsService.findUnique({ id });
    if (!train) throw new NotFoundException();

    return train;
  }
}
