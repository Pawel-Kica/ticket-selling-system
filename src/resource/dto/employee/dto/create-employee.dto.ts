import { Position } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  name: string;
  surname: string;
  dateOfBirth: Date;
  address: string;
  telephoneNumber: string;
  @ApiProperty({ enum: Position })
  position: Position;
  photoPath: string;
}
