import e from 'express';
import generateIdPrefixes from './generateData';

const stationsNames = [
  'New York Penn Station',
  'Grand Central Terminal',
  'Toronto Union Station',
  'Jamaica Station',
  'Chicago Union Station',
];
const stationsData = stationsNames.map((e) => {
  return { name: e };
});

const stationsSeedData = generateIdPrefixes(stationsData, 'station');

export default stationsSeedData;
