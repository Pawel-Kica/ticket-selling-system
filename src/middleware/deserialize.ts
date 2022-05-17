import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getAuthToken } from '../tests/helpers/setGlobals';
import { JwtService } from '../utils/jwt/jwt.service';

@Injectable()
export class Deserialize implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = getAuthToken(req);
      res.locals.user = this.jwtService.verifyJWT(token);
    } catch (_e) {}
    next();
  }
}
