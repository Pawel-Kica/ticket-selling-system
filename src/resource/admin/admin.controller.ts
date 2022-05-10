import { Controller, Post, UseGuards } from '@nestjs/common';
import { SuccessResponse } from '../../utils/responses';
import { RequireAdmin } from '../../guards/roles.';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
