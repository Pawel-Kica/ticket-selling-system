import { DocumentType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
  @ApiProperty({ enum: DocumentType })
  documentType: DocumentType;
  documentNumber: string;
}
