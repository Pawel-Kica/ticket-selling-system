// Nest
import { ApiProperty } from '@nestjs/swagger';
// Prisma
import { DocumentType, Prisma, Role, User } from '@prisma/client';
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

export class CreateUserResponseDto {
  name: User['name'];
  surname: User['surname'];
  email: User['email'];
  @ApiProperty({ enum: Role })
  role = Role.default;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  blocked: boolean = false;
  @ApiProperty({ enum: DocumentType })
  documentType: User['documentType'];
  documentNumber: User['documentNumber'];
}
