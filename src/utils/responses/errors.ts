import { HttpException } from '@nestjs/common';
import { BetterJoiError } from '../../validation/helpers/betterJoiError';

export class InvalidCredentials extends HttpException {
  constructor() {
    super({ message: 'Invalid Credentials' }, 400);
  }
}
export class InvalidRequestedBody extends HttpException {
  constructor(message: BetterJoiError[] | string) {
    super(message, 400);
  }
}

export class BlockedResourceException extends HttpException {
  constructor() {
    super({ message: 'Account blocked' }, 400);
  }
}

export class InvalidQueryParameterException extends HttpException {
  constructor() {
    super({ message: 'Invalid query parameters' }, 400);
  }
}
