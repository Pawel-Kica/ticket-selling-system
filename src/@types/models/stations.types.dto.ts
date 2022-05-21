import { Prisma, Station } from '@prisma/client';

export type CreateStationInput = Prisma.StationCreateInput;
export type StationsWhereInput = Prisma.StationWhereInput;
export type StationsSelect = Prisma.StationSelect;

export class StationEntity {
  id: Station['id'];
  name: Station['name'];
}
