import { User } from '@prisma/client';
import { Controller, Get } from '@nestjs/common';
import { UserObj } from './decorators/user.decorator';

@Controller()
export class AppController {
  @Get()
  welcome(@UserObj() user: User) {
    console.log(user);
    return { msg: 'Welcome' };
  }
}
