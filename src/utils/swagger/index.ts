import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { lowerCaseFirstLetter } from '../strings';
import { invalidRoleIdBadRequest } from './params';

export const schemaBadRequestDescription =
  'Requested body includes invalid values, read schema messages from response';

export const ApiInvalidRequestedBodySchemaResponse = () =>
  applyDecorators(
    ApiBadRequestResponse({ description: schemaBadRequestDescription }),
  );

export const ApiEmailAlreadyExists = () =>
  applyDecorators(
    ApiConflictResponse({
      description: 'Conflict - email already exists in the database',
      schema: {
        example: {
          statusCode: 409,
          message: 'Conflict',
        },
      },
    }),
  );

export const ApiInvalidParamsResponse = () =>
  applyDecorators(
    ApiBadRequestResponse({
      description: 'Bad request - invalid params in query string',
      schema: {
        example: invalidRoleIdBadRequest,
      },
    }),
  );

export const ApiForbiddenResponseDescription = () =>
  applyDecorators(
    ApiForbiddenResponse({
      description:
        'Forbidden - you do not have enough permissions to access this route',
      schema: {
        example: {
          statusCode: 403,
          message: 'Forbidden',
        },
      },
    }),
  );

export const ApiUserNotFoundResponse = () => ApiSubjectNotFoundResponse('User');

export const ApiSubjectNotFoundResponse = (subject: string) =>
  applyDecorators(
    ApiNotFoundResponse({
      description: `${subject} not found - cannot perform operation on a ${lowerCaseFirstLetter(
        subject,
      )} that does not exist`,
      schema: {
        example: {
          statusCode: 404,
          message: 'Not Found',
        },
      },
    }),
  );

export const ApiAuthEndpointResponse = () =>
  applyDecorators(
    ApiOperation({
      description: `Checks if the authentication token is valid`,
    }),
    ApiForbiddenResponseDescription(),
  );
