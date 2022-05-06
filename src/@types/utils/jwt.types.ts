import { User } from '@prisma/client';

export class JwtTokenDto {
  id: User['id'];
}
