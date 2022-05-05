import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';

//flag
export const RequireRole = (role: string): any => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const user = context.switchToHttp().getResponse().locals.user;
      return user.role === role;
    }
  }
  const guard = mixin(RoleGuardMixin);
  return guard;
};
