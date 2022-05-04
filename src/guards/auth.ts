import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RequireUser implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers.cookie);

    return true;
  }
}
