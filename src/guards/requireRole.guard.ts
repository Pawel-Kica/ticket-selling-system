// Nest
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
// Types
import { Role } from '@prisma/client';
// Services
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

@Injectable()
export class RequireManager implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const { id } = context.switchToHttp().getResponse().locals.user;
      const { role } = await this.usersService.findUnique({ id });

      if (role !== Role.manager) throw new Error();
      return true;
    } catch (_e) {
      throw new ForbiddenException();
    }
  }
}

@Injectable()
export class RequireBoss implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const { id } = context.switchToHttp().getResponse().locals.user;
      const { role } = await this.usersService.findUnique({ id });

      if (role !== Role.boss) throw new Error();
      return true;
    } catch (_e) {
      throw new ForbiddenException();
    }
  }
}

@Injectable()
export class RequireHigherRole implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const { id } = context.switchToHttp().getResponse().locals.user;
      const { role } = await this.usersService.findUnique({ id });

      if (role !== Role.boss && role !== Role.manager) throw new Error();
      return true;
    } catch (_e) {
      throw new ForbiddenException();
    }
  }
}
