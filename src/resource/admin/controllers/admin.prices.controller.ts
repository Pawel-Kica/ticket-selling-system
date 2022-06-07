import {
  UseGuards,
  Controller,
  Body,
  Post,
  NotFoundException,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreatePriceDto,
  PriceEntity,
  UpdatePriceDto,
} from '../../../@types/models/prices.types.dto';
import {
  SuccessResponse,
  SuccessResponseDto,
} from '../../../@types/utils/responses.types';
import { RequireAdmin } from '../../../guards/requireRole.guard';
import {
  ApiConflictResponseDescription,
  ApiForbiddenResponseDescription,
  ApiInvalidRequestedBodySchemaResponse,
  ApiSubjectNotFoundResponse,
} from '../../../utils/swagger';
import { uniqueIdParam } from '../../../utils/swagger/params';
import { PricesService } from '../../prices/prices.service';

@ApiBearerAuth()
@ApiForbiddenResponseDescription()
@UseGuards(RequireAdmin)
@ApiTags('Admin - prices')
@Controller('admin/prices')
export class AdminPricesController {
  constructor(private readonly pricesService: PricesService) {}

  @ApiOperation({
    description: 'Creates a new price',
  })
  @ApiInvalidRequestedBodySchemaResponse()
  @ApiConflictResponseDescription(
    'this price already exists, try to modify it instead of creating new',
  )
  @ApiBody({
    type: CreatePriceDto,
    examples: {
      valid: {
        value: {
          trainType: 'highSpeed',
          carriageType: 'comfort',
          startStationId: 'station1',
          endStationId: '',
          value: 30,
        },
      },
      invalidSchema: {
        summary: 'invalid schema',
        value: {
          trainType: 'slow',
          carriageType: 'comforttttt',
          startStationId: 'station0',
          endStationId: 'station14',
          value: -4,
        },
      },
      conflict: {
        value: {
          trainType: 'highSpeed',
          carriageType: 'comfort',
          startStationId: 'station1',
          endStationId: 'station2',
          value: 30,
        },
      },
    },
  })
  @ApiSubjectNotFoundResponse('Station')
  @Post()
  async create(
    @Body()
    {
      trainType,
      carriageType,
      startStationId,
      endStationId,
      value,
    }: CreatePriceDto,
  ): Promise<PriceEntity> {
    await this.pricesService.validatePriceInput({
      trainType,
      carriageType,
      startStationId,
      endStationId,
    });

    return this.pricesService.create({
      trainType,
      carriageType,
      startStation: {
        connect: {
          id: startStationId,
        },
      },
      endStation: {
        connect: {
          id: endStationId,
        },
      },
      value,
    });
  }

  @ApiOperation({
    description: 'Updates specified price',
  })
  @ApiBody({
    type: UpdatePriceDto,
    examples: {
      valid: {
        value: {
          value: 0,
        },
      },
      invalid: {
        summary: 'invalid schema',
        value: {
          value: -5,
        },
      },
    },
  })
  @Put(':id')
  @ApiInvalidRequestedBodySchemaResponse()
  @ApiParam(uniqueIdParam('price', 'price1', '123', 'updated'))
  @ApiSubjectNotFoundResponse('Price')
  async update(
    @Param('id') id: string,
    @Body()
    { value }: UpdatePriceDto,
  ): Promise<PriceEntity> {
    const price = await this.pricesService.findUnique({ id });
    if (!price) throw new NotFoundException();
    return this.pricesService.update({ id }, { value });
  }

  @ApiOperation({
    description: 'Deletes specified price',
  })
  @Delete(':id')
  @ApiSubjectNotFoundResponse('Price')
  @ApiParam(uniqueIdParam('price', 'price1', '123', 'deleted'))
  async delete(@Param('id') id: string): Promise<SuccessResponseDto> {
    const price = await this.pricesService.findUnique({ id });
    if (!price) throw new NotFoundException();
    await this.pricesService.delete({ id });
    return SuccessResponse;
  }
}
