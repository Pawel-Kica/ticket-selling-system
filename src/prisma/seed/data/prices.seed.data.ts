import generateIdPrefixes from './generateData';
import { TrainType, CarriageType } from '@prisma/client';
import { stationPrefix } from './prefixes';

const pricesData = [
  {
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

const formattedPrices = [];

pricesData.forEach((station) => {
  for (const [trainTypeKey, trainTypeValue] of Object.entries(
    trainTypePrices,
  )) {
    for (const [carriageTypeKey, carriageTypeValue] of Object.entries(
      carriagesTypePrices,
    )) {
      formattedPrices.push({
        ...station,
        trainType: trainTypeKey,
        carriageType: carriageTypeKey,
        value: station.value * trainTypeValue * carriageTypeValue,
      });
    }
  }
});

export const pricePrefix = 'price';
export const pricesSeedData = generateIdPrefixes(formattedPrices, pricePrefix);
