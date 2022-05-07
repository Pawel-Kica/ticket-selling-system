import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../resource/users/users.service';
import { BlockedResourceException } from '../utils/responses/errors';

@Injectable()
export class RequireUser implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { id } = context.switchToHttp().getResponse().locals.user;
      const { blocked } = await this.usersService.findUnique({ id });

      if (blocked) throw new BlockedResourceException();
      return true;
    } catch (e) {
      if (e instanceof BlockedResourceException) throw e;
      throw new ForbiddenException();
    }
  }
}
