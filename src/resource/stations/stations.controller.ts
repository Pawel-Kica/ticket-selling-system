// Nest
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
// Services
import { defaultStationsTakeNumber, StationsService } from './stations.service';
import { StationEntity } from '../../@types/models/stations.types.dto';
import { TakeQuery } from '../../utils/query';

@ApiTags('Public - stations')
@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @ApiOperation({
    description: `Returns specified number of stations`,
  })
  @ApiQuery({
    name: 'take',
    description: 'Specify the number of stations you want to receive',
    examples: {
      empty: {
        value: '',
      },
      default: {
        value: defaultStationsTakeNumber,
      },
      example: {
        value: 3,
      },
    },
    required: false,
  })
  @Get()
  async findMany(@Query() { take }: TakeQuery): Promise<StationEntity[]> {
    return this.stationsService.findMany({}, take);
  }
}
