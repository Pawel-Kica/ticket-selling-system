import { HttpException } from '@nestjs/common';
import { BetterJoiError } from '../../validation/helpers/betterJoiError';

export class InvalidCredentials extends HttpException {
  constructor() {
    super('Invalid credentials', 400);
  }
}
export class InvalidRequestedBody extends HttpException {
  constructor(message: BetterJoiError[]) {
    super(message, 400);
  }
}
