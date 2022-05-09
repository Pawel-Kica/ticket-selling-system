import { Controller, Post, Body, UploadedFile, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiFile } from '../../../decorators/apiFile.decorator';
import { defaultEmployeePhotoPath } from '../../../prisma/seed/data/employees.seed.data';
import { InvalidRequestedBody } from '../../../utils/responses/errors';
import { createUserSchema } from '../../../validation/schemas/user.schema';
import { ApplyValidation } from '../../../validation/validationPipe';
import { EmployeesService } from '../../employees/employees.service';

@ApiTags('Admin - employees')
@ApiBearerAuth()
// @UseGuards(RequireAdmin)
@Controller('admin/employees')
export class AdminEmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiFile()
  @UsePipes(ApplyValidation(createUserSchema))
  create(@UploadedFile() file, @Body() body: any) {
    try {
      const dto = JSON.parse(body.data as string);
      if (!file) dto.photoPath = defaultEmployeePhotoPath;
      return 0;
      // return this.employeesService.create(body.data as any);
    } catch (e) {
      throw new InvalidRequestedBody('Invalid data format');
    }
  }
}
