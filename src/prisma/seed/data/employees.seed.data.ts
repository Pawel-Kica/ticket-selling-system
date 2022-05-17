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
export const numberOfEmployees = 30;
export const numberOfConductors = numberOfEmployees / 2;
export const numberOfDrivers = numberOfEmployees - numberOfConductors;

export const employeesTestData = [
  {
    id: '1',
    name: 'Trudie',
    surname: "O'Hara",
    dateOfBirth: '1991-11-07T13:59:56.038Z',
    address: 'High Point',
    telephoneNumber: '225.803.3471 x952',
    position: 'conductor',
    photoPath: 'employee0',
  },
  {
    id: '2',
    name: 'Trent',
    surname: 'Schaefer',
    dateOfBirth: '1982-06-15T11:41:02.269Z',
    address: 'Pflugerville',
    telephoneNumber: '1-545-920-8971 x53827',
    position: 'conductor',
    photoPath: 'employee0',
  },
  {
    id: '3',
    name: 'Elza',
    surname: 'Schultz',
    dateOfBirth: '1991-09-10T05:07:04.796Z',
    address: 'Milwaukee',
    telephoneNumber: '266-307-5485',
    position: 'conductor',
    photoPath: 'employee0',
  },
];

const employeesData = generateEmployees(numberOfEmployees);

export const employeesSeedData = [
  ...employeesTestData,
  ...generateIdPrefixes(employeesData, employeePrefix),
];
