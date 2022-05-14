import * as moment from 'moment';
import generateIdPrefixes from './generateData';
import { routePointPrefix, routePrefix, stationPrefix } from './prefixes';

const routes = [
  {
    arrivalTime: moment().add(4, 'd').toISOString(),
    departureTime: moment().add(4, 'd').add(6, 'h').toISOString(),
    startStation: {
      connect: {
        id: `${stationPrefix}1`,
      },
    },
    stationsBetween: {
      createMany: {
        data: [
          {
            order: 1,
            stationId: `${stationPrefix}1`,
          },
          {
            order: 2,
            stationId: `${stationPrefix}2`,
          },
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
    arrivalTime: moment().add(3, 'd').add(3, 'h').toISOString(),
    departureTime: moment().add(4, 'd').toISOString(),
    startStation: {
      connect: {
        id: `${stationPrefix}5`,
      },
    },
    stationsBetween: {
      createMany: {
        data: [
          {
            order: 3,
            stationId: `${stationPrefix}3`,
          },
          {
            order: 2,
            stationId: `${stationPrefix}4`,
          },
          {
            order: 1,
            stationId: `${stationPrefix}5`,
          },
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
    arrivalTime: moment().add(2, 'd').toISOString(),
    departureTime: moment().add(3, 'd').toISOString(),
    startStation: {
      connect: {
        id: `${stationPrefix}10`,
      },
    },
    stationsBetween: {
      createMany: {
        data: [
          {
            order: 1,
            stationId: `${stationPrefix}6`,
          },
          {
            order: 3,
            stationId: `${stationPrefix}7`,
          },
          {
            order: 2,
            stationId: `${stationPrefix}8`,
          },
          {
            order: 4,
            stationId: `${stationPrefix}9`,
          },
        ],
      },
    },
    endStation: {
      connect: {
        id: `${stationPrefix}14`,
      },
    },
  },
];

export const routesSeedData = generateIdPrefixes(routes, routePrefix);
