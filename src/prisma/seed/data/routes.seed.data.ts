import * as moment from 'moment';
import generateIdPrefixes from './generateData';
import { routePrefix, stationPrefix } from './prefixes';

export const threeDaysAhead = moment().add(3, 'd');

const generateStation = (
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
    departureTime: threeDaysAhead.add(2, 'd').toISOString(),
    arrivalTime: threeDaysAhead.add(3, 'd').toISOString(),
    startStation: {
      connect: {
        id: `${stationPrefix}1`,
      },
    },
    stationsBetween: {
      createMany: {
        data: [
          generateStation(1, 2, threeDaysAhead.add(2, 'd').add(4, 'h')),
          generateStation(2, 3, threeDaysAhead.add(2, 'd').add(8, 'h')),
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
    departureTime: threeDaysAhead.add(1, 'h').toISOString(),
    arrivalTime: threeDaysAhead.add(10, 'h').toISOString(),
    startStation: {
      connect: {
        id: `${stationPrefix}5`,
      },
    },
    stationsBetween: {
      createMany: {
        data: [
          generateStation(3, 6, threeDaysAhead.add(1, 'h')),
          generateStation(2, 7, threeDaysAhead.add(2, 'h')),
          generateStation(1, 8, threeDaysAhead.add(3, 'h')),
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
    departureTime: moment().add(2, 'd').toISOString(),
    arrivalTime: threeDaysAhead.add(4, 'h').toISOString(),
    startStation: {
      connect: {
        id: `${stationPrefix}10`,
      },
    },
    stationsBetween: {
      createMany: {
        data: [
          generateStation(1, 11, moment().add('2', 'd').add(12, 'h')),
          generateStation(3, 12, threeDaysAhead.add(1, 'h')),
          generateStation(2, 13, threeDaysAhead.add(3, 'h')),
          generateStation(4, 14, threeDaysAhead.add(6, 'h')),
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
