import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RequireUser implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getResponse().locals.user;
    if (!user) return false;
    return true;
  }
}
