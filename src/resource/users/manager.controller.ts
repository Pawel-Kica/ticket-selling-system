// Nest
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards } from '@nestjs/common';
// Guards
import { RequireManager } from '../../guards/requireRole.guard';
// Responses
import { SuccessResponse } from '../../utils/responses';

@ApiBearerAuth()
@UseGuards(RequireManager)
@ApiTags('Manager - main')
@Controller('manager')
export class ManagerController {
  @Post('auth')
  auth() {
    return SuccessResponse;
  }
}
