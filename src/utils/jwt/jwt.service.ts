// Tools
import { sign, verify } from 'jsonwebtoken';
// Nest
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// Types
import { JwtTokenDto } from '../../@types/utils/jwt.types';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  private readonly SECRET_TOKEN =
    this.configService.get<string>('SECRET_TOKEN');
  private readonly TOKEN_TTL = this.configService.get<string>('TOKEN_TTL');

  signJWT(data: JwtTokenDto) {
    return sign(data, this.SECRET_TOKEN, {
      expiresIn: this.TOKEN_TTL,
    });
  }
  verifyJWT(token: string) {
    try {
      return verify(token, this.SECRET_TOKEN);
    } catch (e: any) {
      return null;
    }
  }
}
