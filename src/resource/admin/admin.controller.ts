// Nest
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards } from '@nestjs/common';
// Guards
import { RequireAdmin } from '../../guards/requireRole.guard';
// Responses
import {
  SuccessResponse,
  SuccessResponseDto,
} from '../../utils/responses/main.dto';

@ApiBearerAuth()
@UseGuards(RequireAdmin)
@ApiTags('Admin - main')
@Controller('admin')
export class AdminController {
  @Post('auth')
  auth(): SuccessResponseDto {
    return SuccessResponse;
  }
}
