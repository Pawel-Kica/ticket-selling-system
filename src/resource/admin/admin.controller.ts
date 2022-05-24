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
} from '../../utils/responses/main.dto';
import {
  ApiAuthEndpointResponse,
  ApiForbiddenResponseDescription,
} from '../../utils/responses/swagger';

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
