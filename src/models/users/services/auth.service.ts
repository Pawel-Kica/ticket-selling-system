import { User } from '@prisma/client';
import { ConflictException, Injectable } from '@nestjs/common';
import { hash as hashFn, verify } from 'argon2';
import { InvalidCredentials } from '../../../utils/errors';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService) {}

  async checkEmailAvailability(email: string): Promise<User | void> {
    const user = await this.users.findUnique({ email });
    if (user) throw new ConflictException();
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    return hashFn(password);
  }
  async verifyPassword(passwordToVerify: string, hash: string): Promise<void> {
    const valid = verify(hash, passwordToVerify);
    if (valid) throw new InvalidCredentials();
  }
}
