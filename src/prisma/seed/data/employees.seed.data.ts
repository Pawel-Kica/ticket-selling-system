import { faker } from '@faker-js/faker';
import { Position } from '@prisma/client';
import generateIdPrefixes from './generateData';
import { employeePrefix } from './prefixes';

function generateEmployees(n: number) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push({
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      address: faker.address.cityName(),
      telephoneNumber: faker.phone.phoneNumber(),
      dateOfBirth: faker.date.betweens(
        '1980-01-01T00:00:00.000Z',
        '2000-01-01T00:00:00.000Z',
      )[0],
      position: i < numberOfConductors ? Position.conductor : Position.driver,
      photoPath: defaultEmployeePhotoPath,
    });
  }
  return result;
}

export const defaultEmployeePhotoPath = `${employeePrefix}0`;

export const numberOfEmployees = 20;
export const numberOfConductors = numberOfEmployees / 2;
export const numberOfDrivers = numberOfEmployees - numberOfConductors;

const employeesData = generateEmployees(numberOfEmployees);
export const employeesSeedData = generateIdPrefixes(
  employeesData,
  employeePrefix,
);
