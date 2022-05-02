import { Controller, Get } from '@nestjs/common';
import { InvalidCredentials } from '../utils/errors';

@Controller()
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
