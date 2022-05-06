import { hash } from 'argon2';
import { Prisma } from '@prisma/client';

export function prismaHashPasswordMiddleware(): Prisma.Middleware {
  return async (params: any, next: any) => {
    if (
      params.model === 'User' &&
      (params.action === 'create' || params.action === 'update')
    ) {
      if (params.args.data.password) {
        params.args.data.password = await hash(params.args.data.password);
      }
    }
    const result = await next(params);
    return result;
  };
}
