import { ConflictException, ForbiddenException } from '@nestjs/common';
import { InvalidCredentials } from '../../utils/errors/index';

export const ConflictExceptionError = new ConflictException();
export const InvalidCredentialsError = new InvalidCredentials();
export const ForbiddenError = new ForbiddenException();
