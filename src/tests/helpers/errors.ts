import { ConflictException } from '@nestjs/common';
import { InvalidCredentials } from '../../utils/errors/index';

export const ConflictExceptionError = new ConflictException();
export const InvalidCredentialsError = new InvalidCredentials();
