import { hash, verify } from 'argon2';
import { InvalidCredentials } from '../../utils/responses/errors';
import { JwtService } from '../../utils/jwt/jwt.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return hash(password);
  }
  async verifyPassword(passwordToVerify: string, hash: string): Promise<void> {
    const valid = await verify(hash, passwordToVerify);
    if (!valid) throw new InvalidCredentials();
  }

  createAuthToken(id: string) {
    return this.jwtService.signJWT({ id });
  }
}
