// Data
import {
  carriagePrefix,
  stationPrefix,
  trainPrefix,
} from '../../prisma/seed/data/prefixes';
import { State } from '@prisma/client';
import { testUserId } from './id.test.data';
// Validation
import { validateSchema } from '../../validation/validationPipe';
import { createTicketSchema } from '../../validation/schemas/ticket.schema';
// Responses
import { InvalidRequestedBody } from '../../utils/responses/errors';
import {
  InvalidCarriageIdError,
  InvalidSeatNumberError,
  InvalidStationsError,
  InvalidTrainIdError,
} from '../helpers/responses.dto';

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

const ticketOmitProperties = ['id', 'timeOfOperation'];

export const createTicketObj = {
  valid: {
    startEnd: {
      body: createTicketBodyStationsStartEnd,
      response: {
        data: {
          ...createTicketBodyStationsStartEnd,
          state: State.bought,
          userId: testUserId,
        },
        status: 200,
        omit: ticketOmitProperties,
      },
    },
    startBetween: {
      body: createTicketBodyStationsStartBetween,
      response: {
        data: {
          ...createTicketBodyStationsStartBetween,
          state: State.bought,
          userId: testUserId,
        },
        status: 200,
        omit: ticketOmitProperties,
      },
    },
    between: {
      body: createTicketBodyStationsBetween,
      response: {
        data: {
          ...createTicketBodyStationsBetween,
          state: State.bought,
          userId: testUserId,
        },
        status: 200,
        omit: ticketOmitProperties,
      },
    },
    betweenEnd: {
      body: createTicketBodyStationsBetweenEnd,
      response: {
        data: {
          ...createTicketBodyStationsBetweenEnd,
          state: State.bought,
          userId: testUserId,
        },
        status: 200,
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
      response: new InvalidRequestedBody(
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
