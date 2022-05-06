import { Controller, Post } from '@nestjs/common';
import { SuccessResponse } from '../../utils/responses';
import { RequireAdmin } from '../../decorators/roles.decorators';

@Controller('admin')
export class AdminController {
  @Post()
  create() {
    return 'user blocked';
  }

  @Post('auth')
  @RequireAdmin()
  auth() {
    return SuccessResponse;
  }
}
