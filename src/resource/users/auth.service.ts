import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { hash as hashFn, verify } from 'argon2';
import { InvalidCredentials } from '../../utils/responses/errors';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '../../utils/jwt/jwt.service';
import { JwtTokenDto } from '../../@types/utils/jwt.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async checkEmailAvailability(email: string): Promise<User | void> {
    const user = await this.users.findUnique({ email });
    if (user) throw new ConflictException();
    return user;
  }
  async hashPassword(password: string): Promise<string> {
    return hashFn(password);
  }
  async verifyPassword(passwordToVerify: string, hash: string): Promise<void> {
    const valid = await verify(hash, passwordToVerify);
    if (!valid) throw new InvalidCredentials();
  }
  createAuthToken(data: JwtTokenDto) {
    return this.jwtService.signJWT(data);
  }
}
