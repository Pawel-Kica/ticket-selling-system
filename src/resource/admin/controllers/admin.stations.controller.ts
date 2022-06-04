import {
  UseGuards,
  Controller,
  Post,
  Body,
  UsePipes,
  ConflictException,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiConflictResponseDescription,
  ApiForbiddenResponseDescription,
  ApiInvalidRequestedBodySchemaResponse,
  ApiSubjectNotFoundResponse,
} from '../../../utils/swagger';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { StationEntity } from '../../../@types/models/stations.types.dto';
import { RequireAdmin } from '../../../guards/requireRole.guard';
import { stationsNames } from '../../../prisma/seed/data/stations.seed.data';
import { createStationSchema } from '../../../validation/schemas/station.schema';
import { ApplyValidation } from '../../../validation/validationPipe';
import { CreateStationDto } from '../../dto/station/dto/create-station.dto';
import { StationsService } from '../../stations/stations.service';
import {
  SuccessResponse,
  SuccessResponseDto,
} from './../../../@types/utils/responses.types';
import { uniqueIdParam } from '../../../utils/swagger/params';

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
      invalidSchema: {
        summary: 'invalid schema',
        value: {
          name: { invalid: 'data' },
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
    return this.stationsService.create({ name });
  }

  @ApiOperation({
    description: 'Deletes specified station',
  })
  @ApiParam(uniqueIdParam('station', 'station3'))
  @ApiSubjectNotFoundResponse('Station')
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SuccessResponseDto> {
    await this.stationsService.delete({ id });
    return SuccessResponse;
  }
}
