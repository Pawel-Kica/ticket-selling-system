import { User } from '@prisma/client';

export class JwtTokenDto {
  userId: User['id'];
  role: User['role'];
}
