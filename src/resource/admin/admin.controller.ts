import { Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SuccessResponse } from '../../utils/responses';
import { RequireAdmin } from '../../guards/roles.';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(RequireAdmin)
@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}
  @Post('auth')
  auth() {
    return SuccessResponse;
  }
}
