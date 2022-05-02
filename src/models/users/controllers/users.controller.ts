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
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { InvalidCredentials } from 'src/helpers/errors';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.authService.checkIfEmailAlreadyExists(createUserDto.email);

    const hash = await this.authService.hashPassword(createUserDto.password);

    return this.usersService.create({ ...createUserDto, password: hash });
  }

  @Post('login')
  async login(@Body() { email, password }: LoginUserDto): Promise<User> {
    const user = await this.usersService.findOne({ email });
    if (!user) throw new InvalidCredentials();
    await this.authService.verifyPassword(password, user.password);

    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
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
