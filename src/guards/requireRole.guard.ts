// Nest
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// Types
import { Role } from '@prisma/client';
// Services
import { UsersService } from '../resource/users/users.service';

@Injectable()
export class RequireAdmin implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    await this.usersService.requireRole(context, [Role.admin]);
    return true;
  }
}

@Injectable()
export class RequireManager implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    await this.usersService.requireRole(context, [Role.manager]);
    return true;
  }
}

@Injectable()
export class RequireBoss implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    await this.usersService.requireRole(context, [Role.boss]);
    return true;
  }
}

@Injectable()
export class RequireHigherRole implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    await this.usersService.requireRole(context, [Role.boss, Role.manager]);
    return true;
  }
}
