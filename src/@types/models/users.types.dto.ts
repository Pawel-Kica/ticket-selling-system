// Nest
import { ApiProperty } from '@nestjs/swagger';
// Prisma
import { Prisma, Role } from '@prisma/client';
// Types
import { CreateUserDto } from '../../resource/dto/user/dto/create-user.dto';

export type CreateUserDtoPrisma = Prisma.UserCreateInput;
export type UpdateUserDto = Prisma.UserUpdateInput;
export type UserWhereUniqueDto = Prisma.UserWhereUniqueInput;
export class CreateUserDtoExtended extends CreateUserDto {
  passwordRepetition: string;
}
export class LoginUserDto {
  email: string;
  password: string;
}
export class CreateUserByAdminDto extends CreateUserDtoExtended {
  @ApiProperty({ enum: Role })
  role: Role;
}
