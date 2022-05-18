// Nest
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards } from '@nestjs/common';
// Guards
import { RequireBoss } from '../../guards/requireRole.guard';
// Responses
import {
  SuccessResponse,
  SuccessResponseDto,
} from '../../utils/responses/main.dto';

@ApiBearerAuth()
@UseGuards(RequireBoss)
@ApiTags('Boss')
@Controller('boss')
export class BossController {
  @Post('auth')
  auth(): SuccessResponseDto {
    return SuccessResponse;
  }
}
