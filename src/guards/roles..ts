import { Role } from '@prisma/client';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  mixin,
} from '@nestjs/common';

//flag
export const RequireRole = (role: Role): any => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const user = context.switchToHttp().getResponse().locals.user;
      if (user?.role !== role) throw new ForbiddenException();
      return true;
    }
  }
  return RoleGuardMixin;
};

export const RequireAdminGuard = (): any => {
  const guard = mixin(RequireRole(Role.admin));
  return guard;
};
