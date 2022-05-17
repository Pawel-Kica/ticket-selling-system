// Nest
import { Injectable, NestMiddleware } from '@nestjs/common';
// Types
import { Request, Response, NextFunction } from 'express';
// Services
import { JwtService } from '../utils/jwt/jwt.service';
// Tools
import { getAuthToken } from '../tests/helpers/setGlobals';

@Injectable()
export class Deserialize implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = getAuthToken(req);
    res.locals.user = this.jwtService.verifyJWT(token);
    next();
  }
}
