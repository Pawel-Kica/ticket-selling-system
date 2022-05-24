import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import { ApiInvalidRequestedBodySchemaResponse } from '.';
import { CreateUserDtoExtended } from '../../@types/models/users.types.dto';
import { createTicketObj } from '../../tests/data/tickets.test.data';

export const ApiCreateTicket = (description: string) =>
  applyDecorators(
    ApiOperation({
      description,
    }),
    ApiBody({
      type: CreateUserDtoExtended,
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
          value: createTicketObj.invalid.seatNumber.body,
        },
        invalidStations: {
          summary: 'invalid stations',
          value: createTicketObj.invalid.stations.body,
        },
      },
    }),
    ApiInvalidRequestedBodySchemaResponse(),
  );
