// Responses
import {
  ConflictException,
  ForbiddenException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { SuccessResponse } from '../../utils/responses';
import {
  BlockedResourceException,
  InvalidCredentials,
} from '../../utils/responses/errors';

export const ConflictExceptionError = new ConflictException();
export const InvalidCredentialsError = new InvalidCredentials();
export const ForbiddenError = new ForbiddenException();
export const NotFoundErrorInstance = new NotFoundException();
export const BlockedResourceError = new BlockedResourceException();

export const TokenResponse = { data: {}, status: 200, omit: 'token' };

export const SuccessTestResponse = {
  data: SuccessResponse,
  status: HttpStatus.OK,
  omit: [],
};
