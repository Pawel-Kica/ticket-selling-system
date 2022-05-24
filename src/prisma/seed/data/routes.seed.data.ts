// Tools
import * as moment from 'moment';
import { generateIdPrefixes } from './helpers';
// Data
import { routePrefix, stationPrefix } from './prefixes';

const threeDaysAhead = moment().add(3, 'd');
const twoDaysAhead = moment().add(2, 'd');

const generateSingleStation = (
  order: number,
  stationId: number | string,
  arrivalTime: moment.Moment,
  departureTime: moment.Moment = null,
) => {
  return {
    order,
    stationId: `${stationPrefix}${stationId}`,
    arrivalTime: arrivalTime.toISOString(),
    departureTime: departureTime
      ? departureTime.toISOString()
      : arrivalTime.add(5, 'm').toISOString(),
  };
};

const routes = [
  {
    departureTime: threeDaysAhead.clone().add(3, 'h').toISOString(),
    arrivalTime: threeDaysAhead.clone().add(1, 'd').toISOString(),
    startStation: {
      connect: {
        id: `${stationPrefix}1`,
      },
    },
    stationsBetween: {
      createMany: {
        data: [
          generateSingleStation(1, 2, threeDaysAhead.clone().add(4, 'h')),
          generateSingleStation(2, 3, threeDaysAhead.clone().add(8, 'h')),
        ],
      },
    },
    endStation: {
      connect: {
        id: `${stationPrefix}4`,
      },
    },
  },
  {
    departureTime: threeDaysAhead.clone().add(1, 'h').toISOString(),
    arrivalTime: threeDaysAhead.clone().add(10, 'h').toISOString(),
    startStation: {
      connect: {
        id: `${stationPrefix}5`,
      },
    },
    stationsBetween: {
      createMany: {
        data: [
          generateSingleStation(3, 6, threeDaysAhead.clone().add(1, 'h')),
          generateSingleStation(2, 7, threeDaysAhead.clone().add(2, 'h')),
          generateSingleStation(1, 8, threeDaysAhead.clone().add(3, 'h')),
        ],
      },
    },
    endStation: {
      connect: {
        id: `${stationPrefix}9`,
      },
    },
  },
  {
    departureTime: twoDaysAhead.clone().toISOString(),
    arrivalTime: threeDaysAhead.clone().add(1, 'd').toISOString(),
    startStation: {
      connect: {
        id: `${stationPrefix}10`,
      },
    },
    stationsBetween: {
      createMany: {
        data: [
          generateSingleStation(1, 11, twoDaysAhead.clone().add(12, 'h')),
          generateSingleStation(3, 12, threeDaysAhead.clone().add(1, 'h')),
          generateSingleStation(2, 13, threeDaysAhead.clone().add(3, 'h')),
          generateSingleStation(4, 14, threeDaysAhead.clone().add(6, 'h')),
        ],
      },
    },
    endStation: {
      connect: {
        id: `${stationPrefix}15`,
      },
    },
  },
];

export const routesSeedData = generateIdPrefixes(routes, routePrefix);
