import {
  carriagePrefix,
  stationPrefix,
  trainPrefix,
} from '../../prisma/seed/data/prefixes';

const createTicketBody = {
  seat: 40,
  trainId: `${trainPrefix}1`,
  carriageId: `${carriagePrefix}1`,
  startStationId: `${stationPrefix}1`,
  endStationId: `${stationPrefix}3`,
};

export const createTicketObj = {
  valid: {
    body: createTicketBody,
  },
  invalid: {
    carriageId: {
      body: {
        ...createTicketBody,
        carriageId: 'carriage0',
      },
    },
    trainId: {
      body: {
        ...createTicketBody,
        trainId: 'train2',
      },
    },
    seatNumber: {},
    stations: {},
  },
};
