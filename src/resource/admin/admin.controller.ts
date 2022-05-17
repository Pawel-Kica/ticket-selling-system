// Nest
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards } from '@nestjs/common';
// Guards
import { RequireAdmin } from '../../guards/requireRole.guard';
// Responses
import { SuccessResponse } from '../../utils/responses';

@ApiBearerAuth()
@UseGuards(RequireAdmin)
@ApiTags('Admin - main')
@Controller('admin')
export class AdminController {
  @Post('auth')
  auth() {
    return SuccessResponse;
  }
}
