// Nest
import { Injectable } from '@nestjs/common';
// Tools
import { hash, verify } from 'argon2';
// Services
import { JwtService } from '../../utils/jwt/jwt.service';
// Responses
import { InvalidCredentials } from '../../utils/responses/errors';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createAuthToken(id: string): string {
    return this.jwtService.signJWT({ id });
  }
  async hashPassword(password: string): Promise<string> {
    return hash(password);
  }
  async verifyPassword(passwordToVerify: string, hash: string): Promise<void> {
    const valid = await verify(hash, passwordToVerify);
    if (!valid) throw new InvalidCredentials();
  }
}
