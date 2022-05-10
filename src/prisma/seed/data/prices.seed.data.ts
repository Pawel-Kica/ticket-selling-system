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
    value: 100,
  },
];

const trainTypePrices: { [x: string]: number } = {};
trainTypePrices[TrainType.regional] = 1;
trainTypePrices[TrainType.passenger] = 1.5;
trainTypePrices[TrainType.highSpeed] = 2;

const carriagesTypePrices: { [x: string]: number } = {};
carriagesTypePrices[CarriageType.regular] = 1;
carriagesTypePrices[CarriageType.comfort] = 1.3;

const formattedStations = [];

stationsData.forEach((station) => {
  for (const [_trainTypeKey, trainTypeValue] of Object.entries(
    trainTypePrices,
  )) {
    for (const [_carriageTypeKey, carriageTypeValue] of Object.entries(
      carriagesTypePrices,
    )) {
      formattedStations.push({
        ...station,
        value: station.value * trainTypeValue * carriageTypeValue,
      });
    }
  }
});

export const pricePrefix = 'price';
export const pricesSeedData1 = generateIdPrefixes(
  formattedStations,
  pricePrefix,
);
export const pricesSeedData = [];
