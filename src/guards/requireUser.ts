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
    const user = context.switchToHttp().getResponse().locals.user;
    if (!user) throw new ForbiddenException();

    const usrObj = await this.usersService.findUnique({ id: user.id });
    if (usrObj?.blocked) throw new BlockedResourceException();

    return true;
  }
}
