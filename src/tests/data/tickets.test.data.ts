// Data
import {
  carriagePrefix,
  stationPrefix,
  trainPrefix,
} from '../../prisma/seed/data/prefixes';
import { State } from '@prisma/client';
import { testUserID } from './id.test.data';
// Validation
import { validateSchema } from '../../validation/validationPipe';
import { createTicketSchema } from '../../validation/schemas/ticket.schema';
// Responses
import { InvalidRequestedBodyException } from '../../utils/responses/errors';
import {
  InvalidCarriageIdError,
  InvalidSeatNumberError,
  InvalidStationsError,
  InvalidTrainIdError,
} from '../helpers/responses.dto';
import { HttpStatus } from '@nestjs/common';

const createTicketBodyStationsStartEnd = {
  seat: 40,
  trainId: `${trainPrefix}1`,
  carriageId: `${carriagePrefix}1`,
  startStationId: `${stationPrefix}1`,
  endStationId: `${stationPrefix}4`,
};
const createTicketBodyStationsStartBetween = {
  ...createTicketBodyStationsStartEnd,
  endStationId: `${stationPrefix}3`,
  seat: 1,
};
const createTicketBodyStationsBetween = {
  ...createTicketBodyStationsStartEnd,
  startStationId: `${stationPrefix}2`,
  endStationId: `${stationPrefix}3`,
  seat: 2,
};
const createTicketBodyStationsBetweenEnd = {
  ...createTicketBodyStationsStartEnd,
  startStationId: `${stationPrefix}2`,
  seat: 3,
};
const invalidCarriageIdCreateTicketBody = {
  ...createTicketBodyStationsStartEnd,
  carriageId: 'carriage0',
};
const invalidTrainIdCreateTicketBody = {
  ...createTicketBodyStationsStartEnd,
  trainId: 'train2',
};
const invalidSeatNumberCreateTicketBody = {
  ...createTicketBodyStationsStartEnd,
  seat: 41,
};
const invalidStationsCreateTicketBody = {
  ...createTicketBodyStationsStartEnd,
  startStationId: `${stationPrefix}5`,
};
const invalidCarriageTypeCreateTicketBody = {
  ...createTicketBodyStationsStartEnd,
  carriageId: `${carriagePrefix}2`,
  seat: 21,
};

export const ticketOmitProperties = ['id', 'timeOfOperation'];

export const createTicketObj = {
  valid: {
    startEnd: {
      body: createTicketBodyStationsStartEnd,
      response: {
        data: {
          ...createTicketBodyStationsStartEnd,
          state: State.bought,
          userId: testUserID,
        },
        status: HttpStatus.CREATED,
        omit: ticketOmitProperties,
      },
    },
    startBetween: {
      body: createTicketBodyStationsStartBetween,
      response: {
        data: {
          ...createTicketBodyStationsStartBetween,
          state: State.bought,
          userId: testUserID,
        },
        status: HttpStatus.CREATED,
        omit: ticketOmitProperties,
      },
    },
    between: {
      body: createTicketBodyStationsBetween,
      response: {
        data: {
          ...createTicketBodyStationsBetween,
          state: State.bought,
          userId: testUserID,
        },
        status: HttpStatus.CREATED,
        omit: ticketOmitProperties,
      },
    },
    betweenEnd: {
      body: createTicketBodyStationsBetweenEnd,
      response: {
        data: {
          ...createTicketBodyStationsBetweenEnd,
          state: State.bought,
          userId: testUserID,
        },
        status: HttpStatus.CREATED,
        omit: ticketOmitProperties,
      },
    },
  },
  invalid: {
    carriageId: {
      body: invalidCarriageIdCreateTicketBody,
      response: InvalidCarriageIdError,
    },
    trainId: {
      body: invalidTrainIdCreateTicketBody,
      response: InvalidTrainIdError,
    },
    seatNumber: {
      body: invalidSeatNumberCreateTicketBody,
      response: new InvalidRequestedBodyException(
        validateSchema(createTicketSchema, invalidSeatNumberCreateTicketBody),
      ),
    },
    carriageType: {
      body: invalidCarriageTypeCreateTicketBody,
      response: InvalidSeatNumberError,
    },
    stations: {
      body: invalidStationsCreateTicketBody,
      response: InvalidStationsError,
    },
  },
};
