// Nest
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
// Decorators
import { ApiFile } from '../../../decorators/apiFile.decorator';
// Services
import { EmployeesService } from '../../employees/employees.service';
// Validation
import { ApplyValidation } from '../../../validation/validationPipe';
import { createEmployeeSchema } from './../../../validation/schemas/employee.schema';
// Types
import {
  CreateEmployeeFileDto,
  EmployeeEntityDto,
} from '../../../@types/models/employees.types.dto';
// Guards
import { RequireAdmin } from '../../../guards/requireRole.guard';
// Config
import { defaultEmployeePhotoPath } from '../../../config/files.config';
// Tools
import { omit } from '../../../utils/objects';
import {
  ApiForbiddenResponseDescription,
  ApiInvalidRequestedBodySchemaResponse,
} from '../../../utils/responses/swagger';

@ApiBearerAuth()
@ApiTags('Admin - employees')
@UseGuards(RequireAdmin)
@ApiForbiddenResponseDescription()
@Controller('admin/employees')
export class AdminEmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiOperation({
    description: `Creates a new employee with specified data and photo (photo can be accessed via /employees/image/{photoPath})`,
  })
  @ApiUnsupportedMediaTypeResponse({
    description: 'Unsupported media type - "only .jpg files are allowed"',
    schema: {
      example: {
        statusCode: 415,
        message: 'Unsupported Media Type',
      },
    },
  })
  @ApiInvalidRequestedBodySchemaResponse()
  @Post()
  @ApiFile()
  async create(
    @UploadedFile() file,
    @Body(ApplyValidation(createEmployeeSchema)) body: CreateEmployeeFileDto,
  ): Promise<EmployeeEntityDto> {
    // swagger
    body.photoPath = file?.filename
      ? file.filename.slice(0, -4)
      : defaultEmployeePhotoPath;

    console.log(body);

    return this.employeesService.create(omit(body, 'file'));
  }
}
