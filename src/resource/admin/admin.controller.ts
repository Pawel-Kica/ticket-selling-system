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
import { RequireAdmin } from '../../guards/requireRole.guard';
// Responses
import {
  SuccessResponse,
  SuccessResponseDto,
} from '../../@types/utils/responses.types';
import {
  ApiAuthEndpointResponse,
  ApiForbiddenResponseDescription,
} from '../../utils/swagger';

@ApiBearerAuth()
@ApiForbiddenResponseDescription()
@UseGuards(RequireAdmin)
@ApiTags('Admin - main')
@Controller('admin')
export class AdminController {
  @ApiAuthEndpointResponse()
  @HttpCode(HttpStatus.OK)
  @Post('auth')
  auth(): SuccessResponseDto {
    return SuccessResponse;
  }
}
