import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const schemaBadRequestDescription =
  'Requested body includes invalid values, read schema messages from response';

export const ApiBadRequestSchemaDescription = () =>
  applyDecorators(
    ApiBadRequestResponse({ description: schemaBadRequestDescription }),
  );

export const ApiForbiddenResponseDescription = () =>
  applyDecorators(ApiForbiddenResponse({ description: 'Forbidden' }));

export const ApiSuccessResponse = () =>
  applyDecorators(
    ApiOkResponse({ description: 'The authentication token is valid' }),
  );

export const ApiAuthEndpointResponse = () =>
  applyDecorators(
    ApiOperation({
      description: `Checks if the authentication token and role are valid`,
    }),
    ApiForbiddenResponseDescription(),
  );
