// Nest
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, UsePipes, UseGuards } from '@nestjs/common';
// Services
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
// Types
import {
  CreateUserDtoExtended,
  LoginUserDto,
  CreateUserResponseDto,
} from '../../@types/models/users.types.dto';
// Validation
import {
  loginUserSchema,
  createUserSchema,
} from '../../validation/schemas/user.schema';
import { ApplyValidation } from '../../validation/validationPipe';
// Guards
import { RequireUser } from '../../guards/requireUser.guard';
// Responses
import {
  SuccessResponse,
  SuccessResponseDto,
  TokenResponseDto,
} from '../../utils/responses/main.dto';
import { InvalidCredentials } from '../../utils/responses/errors';

@ApiTags('Users - Main')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UsePipes(ApplyValidation(createUserSchema))
  async create(
    @Body() body: CreateUserDtoExtended,
  ): Promise<CreateUserResponseDto> {
    return this.usersService.createUserHandler(body);
  }

  @Post('login')
  @UsePipes(ApplyValidation(loginUserSchema))
  async login(
    @Body() { email, password }: LoginUserDto,
  ): Promise<TokenResponseDto> {
    const user = await this.usersService.findUnique({ email });
    if (!user) throw new InvalidCredentials();

    await this.authService.verifyPassword(password, user.password);

    return { token: this.authService.createAuthToken(user.id) };
  }

  @ApiBearerAuth()
  @Post('auth')
  @UseGuards(RequireUser)
  auth(): SuccessResponseDto {
    return SuccessResponse;
  }
}
