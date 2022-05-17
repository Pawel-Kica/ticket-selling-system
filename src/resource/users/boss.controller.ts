// Nest
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards } from '@nestjs/common';
// Guards
import { RequireBoss } from '../../guards/requireRole.guard';
// Responses
import { SuccessResponse } from '../../utils/responses';

@ApiBearerAuth()
@UseGuards(RequireBoss)
@ApiTags('Boss')
@Controller('users/boss')
export class BossController {
  @Post('auth')
  auth() {
    return SuccessResponse;
  }
}
