import pureOmit from '../utils/pureOmit';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SessionsService } from '../models/sessions/sessions.service';
import { CookiesService } from '../utils/cookies/cookies.service';
import { JwtService } from '../utils/jwt/jwt.service';

@Injectable()
export class Deserialize implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionsService,
    private readonly cookiesService: CookiesService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      res.locals.user = { id: '12', role: 'admin' };

      const { accessToken, refreshToken } = req.cookies;

      const { decoded: decodedAccess, expired: expiredAccess } =
        this.jwtService.verifyJWT(accessToken);

      if (decodedAccess) {
        const session = await this.sessionService.findUnique({
          id: accessToken,
        });
        if (!session) return next();
        res.locals.user = decodedAccess;
        return next();
      }
      if (!(expiredAccess && refreshToken)) return next();

      const { decoded: decodedRefresh } =
        this.jwtService.verifyJWT(refreshToken);

      if (!decodedRefresh || decodedRefresh.canRefresh) {
        //flag, should we remove cookies? or just delete session
        this.cookiesService.removeAuthCookies(res);
        return next();
      }

      this.cookiesService.createAuthCookie(
        res,
        pureOmit(decodedRefresh, ['canRefresh']),
        'access',
      );

      res.locals.user = decodedRefresh;

      next();
    } catch (_e) {
      next();
    }
  }
}
