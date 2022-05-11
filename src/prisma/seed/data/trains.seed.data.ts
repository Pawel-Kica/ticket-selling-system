import {
  employeePrefix,
  routePrefix,
  trainPrefix,
  userPrefix,
} from './prefixes';
import { TrainType } from '@prisma/client';
import generateIdPrefixes from './generateData';

function generateParams(
  driverId: string,
  driverHelperId: string,
  bossId: string,
  routeId: string,
) {
  return {
    driverId,
    driverHelperId,
    bossId,
    routeId,
  };
}

function generateTrains(
  data: {
    driverId: string;
    driverHelperId: string;
    bossId: string;
    routeId: string;
  }[],
) {
  const result = [];
  data.forEach((e) => {
    result.push({
      driver: {
        connect: { id: `${employeePrefix}${e.driverId}` },
      },
      driverHelper: {
        connect: { id: `${employeePrefix}${e.driverHelperId}` },
      },
      boss: {
        connect: { id: `${userPrefix}${e.bossId}` },
      },
      route: {
        connect: { id: `${routePrefix}${e.routeId}` },
      },
    });
  });
  return result;
}

const trains = generateTrains([
  generateParams('16', '17', '11', '1'),
  generateParams('18', '19', '12', '2'),
]);

const trainsData = [];

trains.forEach((train) => {
  Object.values(TrainType).forEach((e) => {
    trainsData.push({
      ...train,
      type: e,
    });
  });
});

export const trainsSeedData = generateIdPrefixes(trainsData, trainPrefix);
