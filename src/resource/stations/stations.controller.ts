// Nest
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';
// Types
import {
  StationDetailedInfoDto,
  StationEntity,
} from '../../@types/models/stations.types.dto';
// Services
import { defaultStationsTakeNumber, StationsService } from './stations.service';
// Utils
import { TakeQuery } from '../../utils/query';
import { takeParam } from '../../utils/swagger/params';
import { ApiSubjectNotFoundResponse } from '../../utils/swagger';

@ApiTags('Public - stations')
@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @ApiOperation({
    description: `Returns specified number of stations`,
  })
  @ApiQuery(takeParam('stations', defaultStationsTakeNumber, 3))
  @ApiQuery({
    name: 'name',
    description: `Specify the name of the station (or some part of it)`,
    examples: {
      empty: {
        value: '',
      },
      valid: {
        value: 'New',
      },
    },
    required: false,
  })
  @Get()
  async findMany(@Query() { take, name }: TakeQuery): Promise<StationEntity[]> {
    return this.stationsService.findMany(
      {
        name: {
          contains: name,
        },
      },
      take,
    );
  }

  @ApiOperation({
    description: `Returns specified station`,
  })
  @ApiParam({
    name: 'id',
    description: `Specify the ID of station to be found`,
    examples: {
      startStation: {
        summary: 'start station',
        value: 'station1',
      },
      endStation: {
        summary: 'end station',
        value: 'station9',
      },
      stationBetween: {
        summary: 'station between',
        value: 'station12',
      },
      notFound: {
        summary: 'not found',
        value: '123',
      },
    },
  })
  @ApiSubjectNotFoundResponse('Station')
  @Get(':id')
  async findUnique(@Param('id') id: string): Promise<StationDetailedInfoDto> {
    return this.stationsService.findUnique({ id });
  }
}
