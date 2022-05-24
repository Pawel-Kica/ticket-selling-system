import { Body, Controller, Post } from '@nestjs/common';
import {
  DefaultBodyClass,
  DefaultBodyInterface,
  DefaultBodyType,
} from './app.types';

@Controller('app')
export class AppController {
  @Post('class')
  // @ApiBody({ type: DefaultBodyClass })
  postClass(@Body() body: DefaultBodyClass) {
    console.log(body);
    return 'class!!!';
  }
  @Post('type')
  //   @ApiBody({ type: DefaultBodyType })
  postType(@Body() body: DefaultBodyType) {
    console.log(body);
    return 'type!!!';
  }

  @Post('interface')
  // @ApiBody({ type: DefaultBodyInterface })
  postInteface(@Body() body: DefaultBodyInterface) {
    console.log(body);
    return 'interface!!!';
  }
}
