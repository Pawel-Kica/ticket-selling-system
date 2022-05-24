import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserID = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const res = ctx.switchToHttp().getResponse();
    return res.locals.user.id;
  },
);
