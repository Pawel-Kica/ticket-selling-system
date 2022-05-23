// Nest
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
// Tools
import { join } from 'path';
import { existsSync } from 'fs-extra';
// Types
import { Response } from 'express';
// Config
import {
  imagesPath,
  imagesExtension,
  defaultEmployeePhotoPath,
} from '../../config/files.config';

@ApiTags('Public - Employees')
@Controller('employees')
export class EmployeesController {
  @ApiOperation({
    description: `Returns a photo file`,
  })
  @ApiParam({
    name: 'photoName',
    description: 'Specify the photoName that you want to display',
    examples: {
      default: {
        value: defaultEmployeePhotoPath,
      },
      notFound: {
        value: '123',
      },
    },
  })
  @ApiOkResponse({
    description: 'Success - file found and sent without any errors',
  })
  @ApiNotFoundResponse({
    description: `Not found - no such file {photoName}.${imagesExtension}`,
    schema: {
      example: {
        statusCode: 404,
        message: 'Not found',
      },
    },
  })
  @Get('image/:photoName')
  async getPhoto(@Param('photoName') photoName: string, @Res() res: Response) {
    const path = join(imagesPath, `${photoName}.${imagesExtension}`);
    if (!existsSync(path)) throw new NotFoundException();

    return res.sendFile(path);
  }
}
