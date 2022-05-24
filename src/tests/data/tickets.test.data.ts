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
      body: {
        ...createTicketBodyStationsStartEnd,
        carriageId: 'carriage0',
      },
      response: InvalidCarriageIdError,
    },
    trainId: {
      body: {
        ...createTicketBodyStationsStartEnd,
        trainId: 'train2',
      },
      response: InvalidTrainIdError,
    },
    seatNumber: {
      body: {
        ...createTicketBodyStationsStartEnd,
        seat: 41,
      },
      response: new InvalidRequestedBodyException(
        validateSchema(createTicketSchema, {
          ...createTicketBodyStationsStartEnd,
          seat: 41,
        }),
      ),
    },
    carriageType: {
      body: {
        ...createTicketBodyStationsStartEnd,
        carriageId: `${carriagePrefix}2`,
        seat: 21,
      },
      response: InvalidSeatNumberError,
    },
    stations: {
      body: {
        ...createTicketBodyStationsStartEnd,
        startStationId: `${stationPrefix}5`,
      },
      response: InvalidStationsError,
    },
  },
};
