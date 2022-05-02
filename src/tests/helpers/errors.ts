import { ConflictException } from '@nestjs/common';
import { InvalidCredentials } from '../../utils/errors/index';

export const ConflictExceptionInstance = new ConflictException();
export const InvalidCredentialsInstance = new InvalidCredentials();
