import {
  UseGuards,
  Controller,
  Post,
  Body,
  UsePipes,
  ConflictException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { create } from 'ansi-colors';
import { StationEntity } from '../../../@types/models/stations.types.dto';
import { RequireAdmin } from '../../../guards/requireRole.guard';
import {
  stationsNames,
  stationsSeedData,
} from '../../../prisma/seed/data/stations.seed.data';
import { loginUserBody } from '../../../tests/data/users.test.data';
import {
  ApiConflictResponseDescription,
  ApiForbiddenResponseDescription,
  ApiInvalidRequestedBodySchemaResponse,
} from '../../../utils/swagger';
import { createStationSchema } from '../../../validation/schemas/station.schema';
import { ApplyValidation } from '../../../validation/validationPipe';
import { CreateStationDto } from '../../dto/station/dto/create-station.dto';
import { StationsService } from '../../stations/stations.service';

@ApiBearerAuth()
@ApiForbiddenResponseDescription()
@UseGuards(RequireAdmin)
@ApiTags('Admin - stations')
@Controller('admin/stations')
export class AdminStationsController {
  constructor(private readonly stationsService: StationsService) {}

  @ApiOperation({
    description: 'Creates a new station',
  })
  @ApiBody({
    type: CreateStationDto,
    examples: {
      valid: {
        value: {
          name: 'my station',
        },
      },
      conflict: {
        value: {
          name: stationsNames[0],
        },
      },
    },
  })
  @ApiInvalidRequestedBodySchemaResponse()
  @UsePipes(ApplyValidation(createStationSchema))
  @ApiConflictResponseDescription('station with this name already exists')
  @Post()
  async create(@Body() { name }: CreateStationDto): Promise<StationEntity> {
    if (await this.stationsService.findFirst({ name }))
      throw new ConflictException();
    return this.stationsService.create({ name });
  }
}
