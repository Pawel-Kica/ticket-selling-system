import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SuccessResponse } from '../../utils/responses';
import { RequireAdmin } from '../../guards/roles.';

@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Post('blockUser/:id')
  @ApiBearerAuth()
  @UseGuards(RequireAdmin)
  async blockUser(@Param('id') id: string) {
    await this.usersService.update({ id }, { blocked: true });
    return SuccessResponse;
  }

  @Post('auth')
  @ApiBearerAuth()
  @UseGuards(RequireAdmin)
  auth() {
    return SuccessResponse;
  }
}
