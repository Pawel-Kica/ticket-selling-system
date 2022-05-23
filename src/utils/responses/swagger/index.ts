import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { lowerCaseFirstLetter } from '../../strings';

export const schemaBadRequestDescription =
  'Requested body includes invalid values, read schema messages from response';

export const ApiInvalidRequestedBodySchemaResponse = () =>
  applyDecorators(
    ApiBadRequestResponse({ description: schemaBadRequestDescription }),
  );

export const ApiEmailAlreadyExists = () =>
  applyDecorators(
    ApiConflictResponse({
      description: 'Conflict - email already exists in database',
    }),
  );

export const ApiInvalidParamsResponse = () =>
  applyDecorators(
    ApiBadRequestResponse({ description: 'Bad request - invalid params' }),
  );

export const ApiForbiddenResponseDescription = () =>
  applyDecorators(
    ApiForbiddenResponse({
      description:
        'Forbidden - you do not have enough permissions to access this route',
    }),
  );

export const ApiUserNotFoundResponse = () => ApiSubjectNotFoundResponse('User');

export const ApiSubjectNotFoundResponse = (subject: string) =>
  applyDecorators(
    ApiNotFoundResponse({
      description: `${subject} not found - cannot perform operation on a ${lowerCaseFirstLetter(
        subject,
      )} that does not exist`,
    }),
  );

export const ApiAuthEndpointResponse = () =>
  applyDecorators(
    ApiOperation({
      description: `Checks if the authentication token is valid`,
    }),
    ApiForbiddenResponseDescription(),
  );
