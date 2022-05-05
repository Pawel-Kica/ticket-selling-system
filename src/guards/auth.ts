import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { serializeCookies } from '../tests/helpers/setGlobals';

@Injectable()
export class RequireUser implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const cookies = serializeCookies(request.headers.cookie);

    return true;
  }
}
