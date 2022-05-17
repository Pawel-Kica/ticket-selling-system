import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequireManager } from '../../guards/roles.';
import { SuccessResponse } from '../../utils/responses';

@ApiBearerAuth()
@ApiTags('Manager - main')
@Controller('manager')
@UseGuards(RequireManager)
export class ManagerController {
  @Post('auth')
  auth() {
    return SuccessResponse;
  }
}
