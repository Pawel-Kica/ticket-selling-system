// Types
import { TrainType, CarriageType } from '@prisma/client';
// Tools
import { generateIdPrefixes } from './helpers';
// Data
import { pricePrefix } from './prefixes';
import { stationsSeedData } from './stations.seed.data';

function generateAllPrices(stations: any[]) {
  const numberOfStations = stations.length;

  const prices = [];
  const result = [];

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

  const trainTypePrices: { [x: string]: number } = {};
  trainTypePrices[TrainType.regional] = 1;
  trainTypePrices[TrainType.passenger] = 1.5;
  trainTypePrices[TrainType.highSpeed] = 2;

  const carriagesTypePrices: { [x: string]: number } = {};
  carriagesTypePrices[CarriageType.regular] = 1;
  carriagesTypePrices[CarriageType.comfort] = 1.3;

  prices.forEach((station) => {
    for (const [trainTypeKey, trainTypeValue] of Object.entries(
      trainTypePrices,
    )) {
      for (const [carriageTypeKey, carriageTypeValue] of Object.entries(
        carriagesTypePrices,
      )) {
        result.push({
          ...station,
          trainType: trainTypeKey,
          carriageType: carriageTypeKey,
          value: station.value * trainTypeValue * carriageTypeValue,
        });
      }
    }
  });

  return result;
}

const pricesData = generateAllPrices(stationsSeedData);

export const pricesSeedData = generateIdPrefixes(pricesData, pricePrefix);
