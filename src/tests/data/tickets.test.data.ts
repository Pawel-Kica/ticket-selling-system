import { type } from 'os';
import {
  carriagePrefix,
  stationPrefix,
  trainPrefix,
} from '../../prisma/seed/data/prefixes';
import { InvalidRequestedBody } from '../../utils/responses/errors';
import { createTicketSchema } from '../../validation/schemas/ticket.schema';
import { validateSchema } from '../../validation/validationPipe';
import {
  InvalidCarriageIdError,
  InvalidSeatNumberError,
  InvalidStationsError,
  InvalidTrainIdError,
  SuccessTestResponse,
} from '../helpers/responses';

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

// export const getTicketsResponse = {
//   data: {
//     '0': {
//       carriage: {
//         id: 'carriage1',
//         numberOfSeats: 40,
//         type: 'regular',
//       },
//       endStation: {
//         name: 'Jamaica Station',
//       },
//       seat: 40,
//       startStation: {
//         name: 'New York Penn Station',
//       },
//       state: 'bought',
//       timeOfOperation: '2022-05-18T07:41:37.169Z',
//       train: {
//         route: {
//           arrivalTime: '2022-05-22T07:41:34.508Z',
//           departureTime: '2022-05-21T08:41:34.508Z',
//           endStation: {
//             name: 'Jamaica Station',
//           },
//           startStation: {
//             name: 'New York Penn Station',
//           },
//           stationsBetween: [
//             {
//               arrivalTime: '2022-05-21T11:41:34.508Z',
//               departureTime: '2022-05-21T11:46:34.508Z',
//               station: {
//                 name: 'Grand Central Terminal',
//               },
//             },
//             {
//               arrivalTime: '2022-05-21T15:41:34.508Z',
//               departureTime: '2022-05-21T15:46:34.508Z',
//               station: {
//                 name: 'Toronto Union Station',
//               },
//             },
//           ],
//         },
//       },
//     },
//   },
//   status: 200,
//   omit: ['timeOfOperation', 'train'],
// };
