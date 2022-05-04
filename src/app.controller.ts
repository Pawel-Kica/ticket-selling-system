import { Controller, Get, UseGuards } from '@nestjs/common';
import { RequireUser } from './guards/auth';
import { InvalidCredentials } from './utils/errors';

@Controller()
@UseGuards(RequireUser)
export class AppController {
  @Get()
  welcome() {
    return { msg: 'Welcome' };
  }
  @Get('err')
  welcome1() {
    throw new InvalidCredentials();
  }
}
