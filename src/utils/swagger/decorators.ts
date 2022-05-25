import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import {
  ApiConflictResponseDescription,
  ApiInvalidRequestedBodySchemaResponse,
  ApiUserNotFoundResponse,
} from '.';
import { CreateUserDtoExtended } from '../../@types/models/users.types.dto';
import {
  CreateTicketBody,
  CreateTicketParams,
} from '../../@types/models/tickets.types.dto';
import { createTicketObj } from '../../tests/data/tickets.test.data';
import { createTicketByManagerObj } from '../../tests/data/manager.test.data';

export const ApiCreateTicket = (description: string) =>
  applyDecorators(
    ApiOperation({
      description,
    }),
    ApiBody({
      type: CreateTicketBody,
      examples: {
        valid: {
          value: createTicketObj.valid.startEnd.body,
        },
        invalidCarriageId: {
          summary: 'invalid carriage id',
          value: createTicketObj.invalid.carriageId.body,
        },
        invalidTrainId: {
          summary: 'invalid train id',
          value: createTicketObj.invalid.trainId.body,
        },
        invalidSeatNumber: {
          summary: 'invalid seat number',
          value: createTicketObj.invalid.carriageType.body,
        },
        invalidStations: {
          summary: 'invalid stations',
          value: createTicketObj.invalid.stations.body,
        },
      },
    }),
    ApiInvalidRequestedBodySchemaResponse(),
    ApiConflictResponseDescription('this seat has already been bought'),
  );

export const ApiCreateTicketByManager = (description: string) =>
  applyDecorators(
    ApiOperation({
      description,
    }),
    ApiBody({
      type: CreateTicketParams,
      examples: {
        book: {
          value: createTicketByManagerObj.valid.book.body,
        },
        buy: {
          value: createTicketByManagerObj.valid.buy.body,
        },
        userNotFound: {
          summary: 'user not found',
          value: createTicketByManagerObj.invalid.notFoundUser.body,
        },
        invalidBook3daysBefore: {
          summary: 'invalid - book only 3 days before',
          value: createTicketByManagerObj.invalid.tooLateToBook.body,
        },
        invalidSchema: {
          summary: 'invalid schema',
          value: createTicketByManagerObj.invalid.schema.body,
        },
      },
    }),
    ApiUserNotFoundResponse(),
    ApiInvalidRequestedBodySchemaResponse(),
    ApiConflictResponseDescription('this seat has already been bought'),
  );
