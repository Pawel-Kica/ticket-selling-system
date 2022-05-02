import { ConflictException, Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { InvalidCredentials } from '../../../helpers/errors';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService) {}

  async checkIfEmailAlreadyExists(email: string): Promise<void> {
    const user = await this.users.findUnique({ email });
    if (user) throw new ConflictException();
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password);
  }
  async verifyPassword(
    passwordToVerify: string,
    hashed: string,
  ): Promise<void> {
    const valid = verify(passwordToVerify, hashed);
    if (valid) throw new InvalidCredentials();
  }
}
