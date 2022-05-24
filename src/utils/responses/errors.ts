import { HttpException } from '@nestjs/common';
import { BetterJoiError } from '../../validation/helpers/betterJoiError';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super({ message: 'Invalid Credentials' }, 400);
  }
}
export class InvalidRequestedBodyException extends HttpException {
  constructor(message: BetterJoiError[] | string) {
    super({ message }, 400);
  }
}

export class BlockedResourceException extends HttpException {
  constructor() {
    super({ message: 'Account blocked' }, 403);
  }
}

export class InvalidQueryParameterException extends HttpException {
  constructor() {
    super({ message: 'Invalid query parameters' }, 400);
  }
}

export class InvalidSeatNumberException extends InvalidRequestedBodyException {
  constructor() {
    super('Invalid seat number');
  }
}
export class InvalidCarriageIdException extends InvalidRequestedBodyException {
  constructor() {
    super('Invalid carriage id');
  }
}
export class InvalidTrainIdException extends InvalidRequestedBodyException {
  constructor() {
    super('Invalid train id');
  }
}
export class InvalidStationException extends InvalidRequestedBodyException {
  constructor() {
    super('Invalid stations');
  }
}
export class NotFoundPriceError extends HttpException {
  constructor() {
    super(
      {
        message:
          'We are not selling tickets for this route yet, try again later',
      },
      404,
    );
  }
}
