import { CreateJwtTokenDto } from './create-jwt.dto';

export class JwtTokenDto extends CreateJwtTokenDto {
  canRefresh: boolean;
}
