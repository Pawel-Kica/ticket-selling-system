import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequireBoss } from '../../guards/roles.';
import { SuccessResponse } from '../../utils/responses';

@ApiBearerAuth()
@UseGuards(RequireBoss)
@ApiTags('Boss')
@Controller('users/boss')
export class UsersController {
  @Post('auth')
  auth() {
    return SuccessResponse;
  }
}
