import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from './entities/user.entity';
import { hash, verify } from 'argon2';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';
import { EmailAlreadyExists, InvalidCredentials } from 'src/helpers/errors';

@Injectable()
export class AuthService {
  constructor(private users: UsersService) {}

  async checkIfEmailAvailable(email: string): Promise<void> {
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

  async login({ email, password }: LoginUserDto): Promise<any | User> {
    const user = await this.users.findOne({ email });

    // if(!user) throw new InvalidCredentials()
    await this.verifyPassword(password, user.password);
    return 'Dsa';
  }
}
