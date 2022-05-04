// Tools
import { sign, verify } from 'jsonwebtoken';
// Nest
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// Types
import { cookiesOptions } from '../../config/cookies.config';
import { CreateJwtTokenDto, JwtTokenDto } from '../../@types/utils/jwt.types';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  private readonly SECRET_TOKEN =
    this.configService.get<string>('SECRET_TOKEN');
  private readonly REFRESH_TOKEN_TTL =
    this.configService.get<string>('REFRESH_TOKEN_TTL');
  private readonly ACCESS_TOKEN_TTL =
    this.configService.get<string>('ACCESS_TOKEN_TTL');

  signJWT(data: CreateJwtTokenDto, type: cookiesOptions) {
    return sign(data, this.SECRET_TOKEN, {
      expiresIn:
        type === 'refresh' ? this.REFRESH_TOKEN_TTL : this.ACCESS_TOKEN_TTL,
    });
  }

  verifyJWT(token: string) {
    try {
      const decoded = <JwtTokenDto>verify(token, this.SECRET_TOKEN);
      return {
        decoded,
        expired: false,
      };
    } catch (e: any) {
      return {
        decoded: null,
        expired: e.message === 'jwt expired',
      };
    }
  }
}
