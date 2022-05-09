import { Controller, Post, Body, UsePipes, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { InvalidCredentials } from '../../utils/responses/errors';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from '../../@types/models/users.types.dto';
import {
  createUserSchema,
  loginSchema,
} from '../../validation/schemas/user.schema';
import { ApplyValidation } from '../../validation/validationPipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from '../../utils/responses';
import { RequireUser } from '../../guards/requireUser';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UsePipes(ApplyValidation(createUserSchema))
  async createHandler(@Body() body: CreateUserDto) {
    const result = await this.usersService.createUserHandler(body as any);
    return result;
  }

  @Post('login')
  @UsePipes(ApplyValidation(loginSchema))
  async loginHandler(@Body() { email, password }: LoginUserDto) {
    const user = await this.usersService.findUnique({ email });
    if (!user) throw new InvalidCredentials();

    await this.authService.verifyPassword(password, user.password);

    return { token: this.authService.createAuthToken(user.id) };
  }

  @Post('auth')
  @UseGuards(RequireUser)
  auth() {
    return SuccessResponse;
  }
}
