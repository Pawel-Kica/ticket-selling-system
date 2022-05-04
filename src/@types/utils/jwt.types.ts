import { User, Session } from '@prisma/client';

export class CreateJwtTokenDto {
  userId: User['id'];
  sessionId: Session['id'];
  accountType: User['role'];
}

export class JwtTokenDto extends CreateJwtTokenDto {
  canRefresh: boolean;
}
