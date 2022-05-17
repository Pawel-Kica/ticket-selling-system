// Types
import { CarriageType } from '@prisma/client';
// Tools
import { generateIdPrefixes } from './helpers';
// Data
import { trainsSeedData } from './trains.seed.data';
import { carriagePrefix, employeePrefix } from './prefixes';

const carriages = [];

let conductorNumber = 1;

trainsSeedData.forEach((e) => {
  Object.values(CarriageType).forEach((type) => {
    carriages.push({
      type,
      numberOfSeats: type === CarriageType.regular ? 40 : 20,
      conductor1: {
        connect: {
          id: `${employeePrefix}${conductorNumber}`,
        },
      },
      conductor2: {
        connect: {
          id: `${employeePrefix}${conductorNumber + 1}`,
        },
      },
      train: {
        connect: {
          id: e.id,
        },
      },
    });
  });
  conductorNumber += 2;
});

export const carriagesSeedData = generateIdPrefixes(carriages, carriagePrefix);
