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
    trainType: '',
    carriageType: '',
    value: 100,
  },
];

const trainTypePrices: { [x: string]: number } = {};
trainTypePrices[TrainType.regional] = 1;
trainTypePrices[TrainType.passenger] = 1.5;
trainTypePrices[TrainType.highSpeed] = 2;

const carriagesTypePrices: { [x: string]: number } = {};
carriagesTypePrices[CarriageType.backpack] = 1;
carriagesTypePrices[CarriageType.suitcase] = 1.3;

const formattedStations = [];

stationsData.forEach((station) => {
  for (const [trainTypeKey, trainTypeValue] of Object.entries(
    trainTypePrices,
  )) {
    for (const [carriageTypeKey, carriageTypeValue] of Object.entries(
      carriagesTypePrices,
    )) {
      formattedStations.push({
        ...station,
        value: station.value * trainTypeValue * carriageTypeValue,
        trainType: trainTypeKey,
        carriageType: carriageTypeKey,
      });
    }
  }
});

export const pricePrefix = 'price';
export const pricesSeedData = generateIdPrefixes(
  formattedStations,
  pricePrefix,
);
