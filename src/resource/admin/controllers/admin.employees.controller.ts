import { UseGuards, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequireAdmin } from '../../../guards/roles.';
import { UsersService } from '../../users/users.service';

@ApiBearerAuth()
@UseGuards(RequireAdmin)
@Controller('admin/employees')
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create() {
    //
  }
}
