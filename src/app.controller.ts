import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { UserObj } from './decorators/user.decorator';
import { RequireUser } from './guards/requireUser';
import { RequireRole } from './guards/roles.';
import { InvalidCredentials } from './utils/errors';

@Controller()
@UseGuards(RequireUser, RequireRole(Role.admin))
@ApiBearerAuth('jwt')
export class AppController {
  @Get()
  welcome(@UserObj() user: User) {
    console.log(user);
    return { msg: 'Welcome' };
  }
  @Get('err')
  welcome1(): any {
    throw new InvalidCredentials();
  }
}
