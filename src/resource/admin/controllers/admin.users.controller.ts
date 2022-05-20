// Nest
import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// Types
import { Role } from '@prisma/client';
import {
  CreateUserByAdminDto,
  CreateUserResponseDto,
} from '../../../@types/models/users.types.dto';
// Guards
import { RequireAdmin } from '../../../guards/requireRole.guard';
// Validation
import { ApplyValidation } from '../../../validation/validationPipe';
import { createUserByAdminSchema } from '../../../validation/schemas/user.schema';
// Services
import { UsersService } from '../../users/users.service';
// Responses
import {
  SuccessResponse,
  SuccessResponseDto,
} from '../../../utils/responses/main.dto';

@ApiBearerAuth()
@UseGuards(RequireAdmin)
@ApiTags('Admin - users')
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ApplyValidation(createUserByAdminSchema))
  async create(
    @Body() body: CreateUserByAdminDto,
  ): Promise<CreateUserResponseDto> {
    return this.usersService.createUserHandler(body);
  }

  @Put('block/:id')
  async blockUser(@Param('id') id: string): Promise<SuccessResponseDto> {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.update({ id }, { blocked: true });
    return SuccessResponse;
  }
  @Put('unblock/:id')
  async unblockUser(@Param('id') id: string): Promise<SuccessResponseDto> {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.update({ id }, { blocked: false });
    return SuccessResponse;
  }

  @Put('role/:id/:role')
  async updateRole(
    @Param('id') id: string,
    @Param('role') role: Role,
  ): Promise<SuccessResponseDto> {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.update({ id }, { role });
    return SuccessResponse;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.remove({ id });
    return SuccessResponse;
  }
}
