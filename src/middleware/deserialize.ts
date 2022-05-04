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
  async use(req: Request, _res: Response, next: NextFunction) {
    const { accessToken, refreshToken } = req.cookies;

    const session = await this.sessionService.findUnique({
      id: accessToken,
    });
    console.log(session);
    console.log('tu');
    next();
  }
}
