import { User } from '@prisma/client';
import { UserObj } from './decorators/user.decorator';
import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  welcome(@UserObj() user: User) {
    console.log(user);
    return { msg: 'Welcome' };
  }
}
