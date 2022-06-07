import {
  UseGuards,
  Controller,
  Post,
  Body,
  UsePipes,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiConflictResponseDescription,
  ApiForbiddenResponseDescription,
  ApiInvalidRequestedBodySchemaResponse,
  ApiSubjectNotFoundResponse,
} from '../../../utils/swagger';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { StationEntity } from '../../../@types/models/stations.types.dto';
import { RequireAdmin } from '../../../guards/requireRole.guard';
import { stationsNames } from '../../../prisma/seed/data/stations.seed.data';
import { createUpdateStationSchema } from '../../../validation/schemas/station.schema';
import { ApplyValidation } from '../../../validation/validationPipe';
import { CreateStationDto } from '../../dto/station/dto/create-station.dto';
import { StationsService } from '../../stations/stations.service';
import {
  SuccessResponse,
  SuccessResponseDto,
} from './../../../@types/utils/responses.types';
import { uniqueIdParam } from '../../../utils/swagger/params';
import { UpdateStationDto } from '../../dto/station/dto/update-station.dto';

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
  @UsePipes(ApplyValidation(createUpdateStationSchema))
  @ApiConflictResponseDescription('station with this name already exists')
  @Post()
  async create(@Body() { name }: CreateStationDto): Promise<StationEntity> {
    return this.stationsService.create({ name });
  }

  @ApiOperation({
    description: 'Updates specified station',
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
  @ApiParam(uniqueIdParam('station', 'station1', '123', 'updated'))
  @ApiBadRequestResponse({
    description: 'Bad request - cannot update the same value',
    schema: {
      example: {
        statusCode: 400,
        message: 'Bad request',
      },
    },
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(ApplyValidation(createUpdateStationSchema))
    { name }: UpdateStationDto,
  ): Promise<StationEntity> {
    return this.stationsService.update({ id }, { name });
  }

  @ApiOperation({
    description: 'Deletes specified station',
  })
  @ApiParam(uniqueIdParam('station', 'station1', '123', 'deleted'))
  @ApiSubjectNotFoundResponse('Station')
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SuccessResponseDto> {
    await this.stationsService.delete({ id });
    return SuccessResponse;
  }
}
