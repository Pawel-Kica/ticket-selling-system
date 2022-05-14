import { User } from '@prisma/client';
import { Controller, Get } from '@nestjs/common';
import { UserId } from './decorators/user.decorator';

@Controller()
export class AppController {
  @Get()
  welcome(@UserId() user: User) {
    console.log(user);
    return { msg: 'Welcome' };
  }
}
