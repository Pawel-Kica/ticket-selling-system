// Nest
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
// Guards
import { RequireBoss } from '../../guards/requireRole.guard';
// Responses
import {
  SuccessResponse,
  SuccessResponseDto,
} from '../../utils/responses/main.dto';
import { ApiAuthEndpointResponse } from '../../utils/responses/swagger';

@ApiBearerAuth()
@UseGuards(RequireBoss)
@ApiTags('Boss - Main')
@Controller('boss')
export class BossController {
  @ApiAuthEndpointResponse()
  @HttpCode(HttpStatus.OK)
  @Post('auth')
  auth(): SuccessResponseDto {
    return SuccessResponse;
  }
}
