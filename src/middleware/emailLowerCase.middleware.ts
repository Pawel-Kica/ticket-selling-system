// Nest
import { Injectable, NestMiddleware } from '@nestjs/common';
// Types
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class EmailToLowerCase implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    if (req.body?.email) req.body.email = req.body.email.toLowerCase();
    next();
  }
}
