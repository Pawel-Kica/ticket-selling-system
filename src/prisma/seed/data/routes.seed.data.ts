import * as moment from 'moment';
import generateIdPrefixes from './generateData';
import { routePrefix, stationPrefix } from './prefixes';

const routes = [
  {
    arrivalTime: moment().toISOString(),
    departureTime: moment().toISOString(),
    startStation: {
      connect: {
        id: `${stationPrefix}1`,
      },
    },
    endStation: {
      connect: {
        id: `${stationPrefix}2`,
      },
    },
  },
];

export const routesSeedData = generateIdPrefixes(routes, routePrefix);
