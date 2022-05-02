import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { UsersService } from './users.service';
import { EmailAlreadyExists, InvalidCredentials } from 'src/helpers/errors';

@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService) {}

  async checkIfEmailAlreadyExists(email: string): Promise<void> {
    const user = await this.users.findOne({ email });
    if (!user) throw new EmailAlreadyExists();
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
