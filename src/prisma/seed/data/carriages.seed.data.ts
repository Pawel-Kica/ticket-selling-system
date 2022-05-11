import { CarriageType } from '@prisma/client';
import generateIdPrefixes from './generateData';
import { carriagePrefix, employeePrefix } from './prefixes';
import { trainsSeedData } from './trains.seed.data';

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
