import { User, Session } from '@prisma/client';

export class CreateJwtTokenDto {
  userId: User['id'];
  sessionId: Session['id'];
  role: User['role'];
}

export class JwtTokenDto extends CreateJwtTokenDto {
  canRefresh: boolean;
}
