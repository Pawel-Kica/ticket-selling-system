import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserObj = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const res = ctx.switchToHttp().getResponse();
    return res.locals.user;
  },
);
