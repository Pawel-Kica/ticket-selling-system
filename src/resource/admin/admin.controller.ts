import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SuccessResponse } from '../../utils/responses';
import { RequireAdmin } from '../../guards/roles.';
import { Role } from '@prisma/client';
import { CreateUserDto } from '../../@types/models/users.types';
import { ApplyValidation } from '../../validation/validationPipe';
import { createUserByAdminSchema } from '../../validation/schemas/user.schema';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(RequireAdmin)
@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  @UsePipes(ApplyValidation(createUserByAdminSchema))
  async createUser(@Body() body: CreateUserDto) {
    console.log(body);
    //
  }

  @Patch('blockUser/:id')
  async blockUser(@Param('id') id: string) {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.update({ id }, { blocked: true });
    return SuccessResponse;
  }
  @Patch('unblockUser/:id')
  async unblockUser(@Param('id') id: string) {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.update({ id }, { blocked: false });
    return SuccessResponse;
  }

  @Patch('userRole/:id/:role')
  async updateUserRole(@Param('id') id: string, @Param('role') role: Role) {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.update({ id }, { role });
    return SuccessResponse;
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.remove({ id });
    return SuccessResponse;
  }

  @Post('auth')
  auth() {
    return SuccessResponse;
  }
}
