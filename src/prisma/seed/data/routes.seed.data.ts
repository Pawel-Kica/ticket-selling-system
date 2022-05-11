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
    stationsBetween: {
      connect: [{ id: `${stationPrefix}2` }, { id: `${stationPrefix}3` }],
    },
    endStation: {
      connect: {
        id: `${stationPrefix}4`,
      },
    },
  },
];

export const routesSeedData = generateIdPrefixes(routes, routePrefix);
