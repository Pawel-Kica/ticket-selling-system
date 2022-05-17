// Nest
import { Injectable, NestMiddleware } from '@nestjs/common';
// Types
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Trimmer implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    Object.keys(req.body).map(function (key) {
      if (typeof req.body[key] === 'string')
        req.body[key] = req.body[key].trim();
    });
    next();
  }
}
