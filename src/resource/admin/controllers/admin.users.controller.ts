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
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDtoAdmin } from '../../../@types/models/users.types.dto';
import { RequireAdmin } from '../../../guards/roles.';
import { SuccessResponse } from '../../../utils/responses';
import { createUserByAdminSchema } from '../../../validation/schemas/user.schema';
import { ApplyValidation } from '../../../validation/validationPipe';
import { UsersService } from '../../users/users.service';

@ApiTags('Admin - users')
@ApiBearerAuth()
@UseGuards(RequireAdmin)
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ApplyValidation(createUserByAdminSchema))
  async create(@Body() body: CreateUserDtoAdmin) {
    const result = await this.usersService.createUserHandler(body);
    return result;
  }

  @Patch('block/:id')
  async blockUser(@Param('id') id: string) {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.update({ id }, { blocked: true });
    return SuccessResponse;
  }
  @Patch('unblock/:id')
  async unblockUser(@Param('id') id: string) {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.update({ id }, { blocked: false });
    return SuccessResponse;
  }

  @Patch('role/:id/:role')
  async updateRole(@Param('id') id: string, @Param('role') role: Role) {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.update({ id }, { role });
    return SuccessResponse;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.remove({ id });
    return SuccessResponse;
  }
}
