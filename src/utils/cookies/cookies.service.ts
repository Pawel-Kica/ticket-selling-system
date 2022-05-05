import { Injectable } from '@nestjs/common';
import {
  ACCESS_TOKEN,
  cookiesOptions,
  REFRESH_TOKEN,
} from './../../config/cookies.config';
import { CookieOptions, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '../jwt/jwt.service';
import { CreateJwtTokenDto } from '../../@types/utils/jwt.types';

@Injectable()
export class CookiesService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // naming COOKIE_MAX_AGE just for better readibility, it should be the same value as REFRESH_TOKEN_TTL (security reasons)
  private readonly COOKIE_MAX_AGE =
    this.configService.get<number>('REFRESH_TOKEN_TTL');

  private readonly COOKIES_CONFIG: CookieOptions = {
    sameSite: 'strict',
    secure: true,
    httpOnly: true,
    maxAge: this.COOKIE_MAX_AGE,
  };

  setAuthCookie(res: Response, token: string, type: cookiesOptions) {
    res.cookie(
      type === 'refresh' ? REFRESH_TOKEN : ACCESS_TOKEN,
      token,
      this.COOKIES_CONFIG,
    );
  }
  createAuthCookie(
    res: Response,
    data: CreateJwtTokenDto,
    type: cookiesOptions,
  ) {
    const accessToken = this.jwtService.signJWT(data, type);
    this.setAuthCookie(res, accessToken, type);
  }

  removeAuthCookies(res: Response) {
    res.clearCookie(ACCESS_TOKEN);
    res.clearCookie(REFRESH_TOKEN);
  }
}
