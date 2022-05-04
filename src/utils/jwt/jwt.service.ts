import { sign, verify } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateJwtTokenDto } from './dto/create-jwt.dto';
import { JwtTokenDto } from './dto/jwt-token.dto';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  private readonly SECRET_TOKEN =
    this.configService.get<string>('SECRET_TOKEN');
  private readonly EXPIRATION_TIME =
    this.configService.get<number>('EXPIRATION_TIME');

  private signJWT(data: CreateJwtTokenDto) {
    return sign(data, this.SECRET_TOKEN, { expiresIn: this.EXPIRATION_TIME });
  }

  private verifyJWT(token: string) {
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
