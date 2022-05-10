import { Role } from '@prisma/client';
import { Train } from '../../train/entities/train.entity';

export class UserDto {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: Role;
  blocked: boolean;
  Train?: Train[];
}
