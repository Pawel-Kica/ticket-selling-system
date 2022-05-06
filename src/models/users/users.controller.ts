import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Res,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { InvalidCredentials } from '../../utils/errors';
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
import { Response } from 'express';
import { omit } from '../../utils/objects';
import { RequireUser } from '../../guards/requireUser';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtService } from '../../utils/jwt/jwt.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(ApplyValidation(createUserSchema))
  async createHandler(
    @Res({ passthrough: true }) res: Response,
    @Body() body: CreateUserDto,
  ) {
    await this.authService.checkEmailAvailability(body.email);
    const user = await this.usersService.create(
      omit(body, 'passwordRepetition'),
    );
    this.authService.createAuthToken(res, { id: user.id, role: user.role });
    return this.usersService.formattedUser(user);
  }

  @Post('login')
  @UsePipes(ApplyValidation(loginSchema))
  async loginHandler(
    @Res({ passthrough: true }) res: Response,
    @Body() { email, password }: LoginUserDto,
  ) {
    const user = await this.usersService.findUnique({ email });
    if (!user) throw new InvalidCredentials();
    await this.authService.verifyPassword(password, user.password);
    return {
      token: this.authService.createAuthToken(res, {
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
    return { success: true };
  }
}
