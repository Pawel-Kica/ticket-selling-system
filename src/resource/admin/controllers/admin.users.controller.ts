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
  BadRequestException,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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
import {
  ApiInvalidRequestedBodySchemaResponse,
  ApiEmailAlreadyExists,
  ApiForbiddenResponseDescription,
  ApiUserNotFoundResponse,
  ApiInvalidParamsResponse,
} from '../../../utils/responses/swagger';
// Data
import {
  createUserByAdminBody,
  invalidCreateUserByAdminBody,
} from '../../../tests/data/admin.test.data';
import { testUserID } from '../../../tests/data/id.test.data';
import { AdminUpdateUserRoleQuery } from '../../../utils/query';
import { userIDParam } from '../../../utils/responses/swagger/params';

@ApiBearerAuth()
@ApiForbiddenResponseDescription()
@UseGuards(RequireAdmin)
@ApiTags('Admin - users')
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  private userIDparam(action: string) {
    return {
      name: 'id',
      description: `Specify the ID of user to be ${action}`,
      examples: {
        valid: {
          value: testUserID,
        },
        notFound: {
          summary: 'not found',
          value: '123',
        },
      },
    };
  }

  @ApiOperation({
    description: `Creates a new user with specified role`,
  })
  @ApiBody({
    type: CreateUserByAdminDto,
    examples: {
      valid: {
        summary: 'Valid',
        value: createUserByAdminBody,
      },
      invalidSchema: {
        summary: 'Invalid schema',
        value: invalidCreateUserByAdminBody,
      },
      types: {
        summary: 'Types',
        description: 'For enum values, look in body dto/schema',
        value: {
          name: 'string',
          surname: 'string',
          email: 'string',
          password: 'string',
          passwordRepetition: 'string',
          documentType: 'passport',
          documentNumber: 'string',
          role: 'admin',
        },
      },
    },
  })
  @ApiInvalidRequestedBodySchemaResponse()
  @ApiEmailAlreadyExists()
  @UsePipes(ApplyValidation(createUserByAdminSchema))
  @Post()
  async create(
    @Body() body: CreateUserByAdminDto,
  ): Promise<CreateUserResponseDto> {
    return this.usersService.createUserHandler(body);
  }

  @ApiOperation({
    description: `Blocks specified user`,
  })
  @ApiParam(userIDParam('blocked'))
  @ApiUserNotFoundResponse()
  @Put('block/:id')
  async blockUser(@Param('id') id: string): Promise<SuccessResponseDto> {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.update({ id }, { blocked: true });
    return SuccessResponse;
  }
  @ApiOperation({
    description: `Unblocks specified user`,
  })
  @ApiParam(userIDParam('unblocked'))
  @ApiUserNotFoundResponse()
  @Put('unblock/:id')
  async unblockUser(@Param('id') id: string): Promise<SuccessResponseDto> {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.update({ id }, { blocked: false });
    return SuccessResponse;
  }

  @ApiOperation({
    description: `Updates specified user role `,
  })
  @ApiQuery(userIDParam('unblocked'))
  @ApiQuery({
    name: 'role',
    description: 'Specify the role type to updated',
  })
  @ApiUserNotFoundResponse()
  @ApiInvalidParamsResponse()
  @Put('role')
  async updateRole(
    @Query() { id, role }: AdminUpdateUserRoleQuery,
  ): Promise<SuccessResponseDto> {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.update({ id }, { role });
    return SuccessResponse;
  }

  @ApiOperation({
    description: `Deletes specified user`,
  })
  @ApiParam({
    name: 'id',
    description: 'Specify the ID of user to be deleted',
    examples: {
      userID: {
        value: testUserID,
      },
    },
  })
  @ApiUserNotFoundResponse()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
    await this.usersService.checkIfUserExists({ id });
    await this.usersService.remove({ id });
    return SuccessResponse;
  }
}
