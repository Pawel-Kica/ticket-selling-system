import * as moment from 'moment';
import generateIdPrefixes from './generateData';
import { routePrefix, stationPrefix } from './prefixes';

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
      connect: [{ id: `${stationPrefix}2` }, { id: `${stationPrefix}3` }],
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
      connect: [
        { id: `${stationPrefix}6` },
        { id: `${stationPrefix}7` },
        { id: `${stationPrefix}8` },
      ],
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
      connect: [
        { id: `${stationPrefix}11` },
        { id: `${stationPrefix}12` },
        { id: `${stationPrefix}13` },
        { id: `${stationPrefix}1` },
      ],
    },
    endStation: {
      connect: {
        id: `${stationPrefix}14`,
      },
    },
  },
];

export const routesSeedData = generateIdPrefixes(routes, routePrefix);
