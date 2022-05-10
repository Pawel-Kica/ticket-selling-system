import {
  employeePrefix,
  routePrefix,
  trainPrefix,
  userPrefix,
} from './prefixes';
import { TrainType } from '@prisma/client';
import generateIdPrefixes from './generateData';

const trains = [
  {
    type: TrainType.highSpeed,
    driver: {
      connect: { id: `${employeePrefix}11` },
    },
    driverHelper: {
      connect: { id: `${employeePrefix}12` },
    },
    boss: {
      connect: { id: `${userPrefix}11` },
    },
    route: {
      connect: { id: `${routePrefix}1` },
    },
  },
];

export const trainsSeedData = generateIdPrefixes(trains, trainPrefix);
