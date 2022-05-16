import generateIdPrefixes from './generateData';
import { TrainType, CarriageType } from '@prisma/client';
import { pricePrefix } from './prefixes';
import { stationsSeedData } from './stations.seed.data';

function generateAllPrices(stations: any[]) {
  const prices = [];
  const numberOfStations = stations.length;
  for (let i = 0; i < numberOfStations; i++)
    for (let j = 1; j < numberOfStations; j++) {
      prices.push({
        startStation: {
          connect: {
            id: stations[i].id,
          },
        },
        endStation: {
          connect: {
            id: stations[j].id,
          },
        },
        value: 10 * Math.abs(i - j),
      });
    }
  return prices;
}

const pricesData = generateAllPrices(stationsSeedData);

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

export const pricesSeedData = generateIdPrefixes(formattedPrices, pricePrefix);
