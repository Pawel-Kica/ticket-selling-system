import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const FormatUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const res = ctx.switchToHttp().getResponse();
    return res.locals.user;
  },
);
