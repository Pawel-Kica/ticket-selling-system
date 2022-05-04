import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { InvalidCredentials } from '../../../utils/errors';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../users.types';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async createHandler(@Body() createUserDto: CreateUserDto): Promise<User> {
    await this.authService.checkEmailAvailability(createUserDto.email);

    const hash = await this.authService.hashPassword(createUserDto.password);

    return this.usersService.create({ ...createUserDto, password: hash });
  }

  @Post('login')
  async loginHandler(@Body() { email, password }: LoginUserDto): Promise<User> {
    const user = await this.usersService.findUnique({ email });
    if (!user) throw new InvalidCredentials();
    await this.authService.verifyPassword(password, user.password);

    return user;
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
}
