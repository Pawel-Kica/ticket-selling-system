// Nest
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseGuards,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
// Decorators
import { ApiFile } from '../../../decorators/apiFile.decorator';
// Services
import { EmployeesService } from '../../employees/employees.service';
// Validation
import { ApplyValidation } from '../../../validation/validationPipe';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from '../../../validation/schemas/employee.schema';
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
import * as moment from 'moment';
import { omit } from '../../../utils/objects';
import {
  ApiForbiddenResponseDescription,
  ApiInvalidRequestedBodySchemaResponse,
  ApiSubjectNotFoundResponse,
} from '../../../utils/swagger';
import { requestDateFormat } from '../../../config/dates.config';
import { uniqueIdParam } from '../../../utils/swagger/params';
import {
  SuccessResponse,
  SuccessResponseDto,
} from '../../../@types/utils/responses.types';
import { employeePrefix } from '../../../prisma/seed/data/prefixes';
import { CreateEmployeeDto } from '../../dto/employee/dto/create-employee.dto';

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
    description: 'Unsupported media type - "only .png files are allowed"',
    schema: {
      example: {
        statusCode: 415,
        message: 'Unsupported Media Type',
      },
    },
  })
  @ApiInvalidRequestedBodySchemaResponse()
  @ApiFile()
  @Post()
  async create(
    @UploadedFile() file,
    @Body(ApplyValidation(createEmployeeSchema)) body: CreateEmployeeFileDto,
  ): Promise<EmployeeEntityDto> {
    // swagger
    body.photoPath = file?.filename
      ? file.filename.slice(0, -4)
      : defaultEmployeePhotoPath;

    return this.employeesService.create(
      omit(
        {
          ...body,
          dateOfBirth: moment(body.dateOfBirth, requestDateFormat)
            .startOf('day')
            .toISOString(),
        },
        'file',
      ),
    );
  }

  @ApiOperation({
    description: 'Updated specified employee',
  })
  @ApiBody({
    type: CreateEmployeeDto,
    examples: {
      valid: {
        value: {
          name: 'NewName',
          surname: 'NewSurname',
          dateOfBirth: '02-05-2002',
          address: 'Newark',
          telephoneNumber: '123456789',
          position: 'driver',
        },
      },
    },
  })
  @ApiParam(uniqueIdParam('employee', `${employeePrefix}1`, '123', 'updated'))
  @ApiSubjectNotFoundResponse('Employee')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(ApplyValidation(updateEmployeeSchema)) body: CreateEmployeeDto,
  ): Promise<EmployeeEntityDto> {
    const formatted: any = { ...body };
    if (body.dateOfBirth)
      formatted.dateOfBirth = moment(body.dateOfBirth, requestDateFormat)
        .startOf('day')
        .toISOString();

    return this.employeesService.update({ id }, formatted);
  }

  @ApiOperation({
    description: 'Deletes specified employee',
  })
  @ApiParam(uniqueIdParam('employee', 'employee1', '123', 'deleted'))
  @ApiSubjectNotFoundResponse('Employee')
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SuccessResponseDto> {
    await this.employeesService.delete({ id });
    return SuccessResponse;
  }
}
