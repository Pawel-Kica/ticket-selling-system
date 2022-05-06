import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { UserObj } from './decorators/user.decorator';
import { RequireUser } from './guards/requireUser';
import { RequireRole } from './guards/roles.';

@Controller()
// @ApiBearerAuth('jwt')
@UseGuards(RequireUser, RequireRole(Role.admin))
export class AppController {
  @Get()
  welcome(@UserObj() user: User) {
    console.log(user);
    return { msg: 'Welcome' };
  }
}
