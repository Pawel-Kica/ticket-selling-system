import generateIdPrefixes from './generateData';
import { TrainType, CarriageType } from '@prisma/client';
import { stationPrefix } from './stations.seed.data';

const stationsData = [
  {
    startStation: {
      connect: {
        id: `${stationPrefix}0`,
      },
    },
    endStation: {
      connect: {
        id: `${stationPrefix}1`,
      },
    },
    trainType: TrainType.highSpeed,
    carriageType: CarriageType.suitcase,
    value: 200,
  },
];

export const pricePrefix = 'price';

export const pricesSeedData = generateIdPrefixes(stationsData, pricePrefix);
