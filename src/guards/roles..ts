import { Role } from '@prisma/client';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../resource/users/users.service';

@Injectable()
export class RequireAdmin implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const { id } = context.switchToHttp().getResponse().locals.user;
      const { role } = await this.usersService.findUnique({ id });

      if (role !== Role.admin) throw new Error();
      return true;
    } catch (_e) {
      throw new ForbiddenException();
    }
  }
}
