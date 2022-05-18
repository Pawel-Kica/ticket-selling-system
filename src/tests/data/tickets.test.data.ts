import {
  carriagePrefix,
  stationPrefix,
  trainPrefix,
} from '../../prisma/seed/data/prefixes';
import { InvalidRequestedBody } from '../../utils/responses/errors';
import { createTicketSchema } from '../../validation/schemas/ticket.schema';
import { createUserSchema } from '../../validation/schemas/user.schema';
import { validateSchema } from '../../validation/validationPipe';
import {
  InvalidCarriageIdError,
  InvalidSeatNumberError,
  InvalidStationsError,
  InvalidTrainIdError,
  SuccessTestResponse,
} from '../helpers/responses';
import { invalidCreateUserBody } from './users.test.data';

const createTicketBody = {
  seat: 40,
  trainId: `${trainPrefix}1`,
  carriageId: `${carriagePrefix}1`,
  startStationId: `${stationPrefix}1`,
  endStationId: `${stationPrefix}4`,
};

export const createTicketObj = {
  valid: {
    startEnd: {
      body: createTicketBody,
      response: SuccessTestResponse,
    },
    startBetween: {
      body: {
        ...createTicketBody,
        endStationId: `${stationPrefix}3`,
        seat: 1,
      },
      response: SuccessTestResponse,
    },
    between: {
      body: {
        ...createTicketBody,
        startStationId: `${stationPrefix}2`,
        endStationId: `${stationPrefix}3`,
        seat: 2,
      },
      response: SuccessTestResponse,
    },
    betweenEnd: {
      body: {
        ...createTicketBody,
        startStationId: `${stationPrefix}2`,
        seat: 3,
      },
      response: SuccessTestResponse,
    },
  },
  invalid: {
    carriageId: {
      body: {
        ...createTicketBody,
        carriageId: 'carriage0',
      },
      response: InvalidCarriageIdError,
    },
    trainId: {
      body: {
        ...createTicketBody,
        trainId: 'train2',
      },
      response: InvalidTrainIdError,
    },
    seatNumber: {
      body: {
        ...createTicketBody,
        seat: 41,
      },
      response: new InvalidRequestedBody(
        validateSchema(createTicketSchema, { ...createTicketBody, seat: 41 }),
      ),
    },
    carriageType: {
      body: {
        ...createTicketBody,
        carriageId: `${carriagePrefix}2`,
        seat: 21,
      },
      response: InvalidSeatNumberError,
    },
    stations: {
      body: {
        ...createTicketBody,
        startStationId: `${stationPrefix}5`,
      },
      response: InvalidStationsError,
    },
  },
};
