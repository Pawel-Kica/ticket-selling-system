import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequireManager } from '../../guards/roles.';
import { SuccessResponse } from '../../utils/responses';

@ApiBearerAuth()
@UseGuards(RequireManager)
@ApiTags('Manager')
@Controller('users/manager')
export class UsersController {
  @Post('auth')
  auth() {
    return SuccessResponse;
  }
}
