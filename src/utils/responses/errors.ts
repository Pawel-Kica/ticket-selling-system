import { BetterJoiError } from '../../validation/helpers/betterJoiError';
import {
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

export class InvalidCredentialsException extends BadRequestException {
  constructor() {
    super('Invalid Credentials');
  }
}
export class InvalidRequestedBodyException extends BadRequestException {
  constructor(messages: BetterJoiError[]) {
    super(messages);
  }
}
export class BlockedResourceException extends ForbiddenException {
  constructor() {
    super('Account blocked');
  }
}
export class InvalidQueryParameterException extends BadRequestException {
  constructor() {
    super('Invalid query parameters');
  }
}
export class InvalidSeatNumberException extends BadRequestException {
  constructor() {
    super('Invalid seat number');
  }
}
export class InvalidCarriageIdException extends BadRequestException {
  constructor() {
    super('Invalid carriage id');
  }
}
export class InvalidTrainIdException extends BadRequestException {
  constructor() {
    super('Invalid train id');
  }
}
export class InvalidStationsException extends BadRequestException {
  constructor() {
    super('Invalid stations');
  }
}
export class NotFoundPriceException extends NotFoundException {
  constructor() {
    super('We are not selling tickets for this route yet, try again later');
  }
}

export class BookOnlyBefore3DaysException extends BadRequestException {
  constructor() {
    super('You can BOOK tickets only before 3 days of departureTime');
  }
}
