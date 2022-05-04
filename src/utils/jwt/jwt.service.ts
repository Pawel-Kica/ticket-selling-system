// Tools
import { sign, verify } from 'jsonwebtoken';
// Nest
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// Types
import { JwtTokenDto } from './dto/jwt-token.dto';
import { CreateJwtTokenDto } from './dto/create-jwt.dto';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  private readonly SECRET_TOKEN =
    this.configService.get<string>('SECRET_TOKEN');
  private readonly EXPIRATION_TIME =
    this.configService.get<number>('EXPIRATION_TIME');

  signJWT(data: CreateJwtTokenDto) {
    return sign(data, this.SECRET_TOKEN, { expiresIn: this.EXPIRATION_TIME });
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
