import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class RequireUser implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getResponse().locals.user;
    if (!user) throw new ForbiddenException();
    return true;
  }
}
