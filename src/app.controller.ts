import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserObj } from './decorators/user.decorator';
import { RequireAdminGuard } from './guards/roles.';

// @ApiBearerAuth('jwt')
// @UseGuards(RequireUser, RequireRole(Role.admin))
// @UseGuards(RequireAdminRole())
@Controller()
@UseGuards(RequireAdminGuard())
export class AppController {
  @Get()
  welcome(@UserObj() user: User) {
    console.log(user);
    return { msg: 'Welcome' };
  }
}
