import { ConflictException, ForbiddenException } from '@nestjs/common';
import { InvalidCredentials } from '../../utils/responses/errors';

export const ConflictExceptionError = new ConflictException();
export const InvalidCredentialsError = new InvalidCredentials();
export const ForbiddenError = new ForbiddenException();

export const tokenResponse = { data: {}, status: 200, omit: 'token' };
