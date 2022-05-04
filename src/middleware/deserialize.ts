import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SessionsService } from '../models/sessions/sessions.service';
import { JwtService } from '../utils/jwt/jwt.service';

@Injectable()
export class Deserialize implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionsService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { accessToken, refreshToken } = req.cookies;

    const { decoded: decodedAccess, expired: expiredAccess } =
      this.jwtService.verifyJWT(accessToken);

    if (decodedAccess) {
      const session = await this.sessionService.findUnique({
        id: accessToken,
      });
      if (!session) return next();

      res.locals.user = decodedAccess;
    }

    next();
  }
}
