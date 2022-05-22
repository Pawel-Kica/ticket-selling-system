// Nest
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// Types
import { Role } from '@prisma/client';
// Services
import { UsersService } from '../resource/users/users.service';
// Responses

@Injectable()
export class RequireUser implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await this.usersService.requireRole(
      context,
      [Role.default, Role.manager, Role.boss],
      [Role.admin],
    );
    return true;
  }
}
