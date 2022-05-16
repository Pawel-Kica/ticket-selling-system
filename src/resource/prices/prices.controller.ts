import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('Prices')
@Controller('prices')
export class PricesController {}
