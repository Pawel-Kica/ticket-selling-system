// Responses
import {
  ConflictException,
  ForbiddenException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  BlockedResourceException,
  InvalidCarriageIdException,
  InvalidCredentialsException,
  InvalidRequestedBodyException,
  InvalidSeatNumberException,
  InvalidStationException,
  InvalidTrainIdException,
} from '../../utils/responses/errors';
// Types
import { ObjectSchema } from 'joi';
import { SuccessResponse } from '../../@types/utils/responses.types';
// Validation
import { validateSchema } from '../../validation/validationPipe';

export const ConflictExceptionError = new ConflictException();
export const InvalidCredentialsError = new InvalidCredentialsException();
export const ForbiddenError = new ForbiddenException();
export const NotFoundErrorInstance = new NotFoundException();
export const BlockedResourceError = new BlockedResourceException();

// create ticket controller
export const InvalidCarriageIdError = new InvalidCarriageIdException();
export const InvalidTrainIdError = new InvalidTrainIdException();
export const InvalidSeatNumberError = new InvalidSeatNumberException();
export const InvalidStationsError = new InvalidStationException();
export const NotFoundPriceError = new InvalidRequestedBodyException(
  'We are not selling tickets for this route yet, try again later',
);
//

export const TokenResponse = { data: {}, status: HttpStatus.OK, omit: 'token' };

export const SuccessTestResponse = {
  data: SuccessResponse,
  status: HttpStatus.OK,
  omit: [],
};

export function requestedBodySchemaError(schema: ObjectSchema, data: any) {
  return new InvalidRequestedBodyException(validateSchema(schema, data));
}
