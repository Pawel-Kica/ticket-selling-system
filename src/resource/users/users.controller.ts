import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { InvalidCredentials } from '../../utils/responses/errors';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from '../../@types/models/users.types';
import {
  createUserSchema,
  loginSchema,
} from '../../validation/schemas/user.schema';
import { ApplyValidation } from '../../validation/validationPipe';
import { omit } from '../../utils/objects';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SuccessResponse } from '../../utils/responses';
import { RequireUser } from '../../guards/requireUser';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UsePipes(ApplyValidation(createUserSchema))
  async createHandler(@Body() body: CreateUserDto) {
    await this.authService.checkEmailAvailability(body.email);
    const user = await this.usersService.create(
      omit(body, 'passwordRepetition'),
    );
    return this.usersService.formattedUser(user);
  }

  @Post('login')
  @UsePipes(ApplyValidation(loginSchema))
  async loginHandler(@Body() { email, password }: LoginUserDto) {
    const user = await this.usersService.findUnique({ email });
    if (!user) throw new InvalidCredentials();
    await this.authService.verifyPassword(password, user.password);
    return {
      token: this.authService.createAuthToken({
        id: user.id,
        role: user.role,
      }),
    };
  }

  @Get()
  findAllHandler() {
    return this.usersService.findMany();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.usersService.findOne();
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('auth')
  @ApiBearerAuth()
  @UseGuards(RequireUser)
  auth() {
    return SuccessResponse;
  }
}
