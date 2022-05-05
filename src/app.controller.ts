import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { FormatUser } from './decorators/user.decorator';
import { RequireUser } from './guards/requireUser';
import { RoleGuard } from './guards/roles.';
import { InvalidCredentials } from './utils/errors';

@Controller()
@UseGuards(RequireUser)
@UseGuards(RoleGuard('admin'))
export class AppController {
  @Get()
  welcome(@FormatUser() user: User) {
    console.log(user);
    return { msg: 'Welcome' };
  }
  @Get('err')
  welcome1(): any {
    throw new InvalidCredentials();
  }
}
