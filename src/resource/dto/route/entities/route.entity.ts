import { Station } from '../../station/entities/station.entity';
import { Train } from '../../train/entities/train.entity';

export class Route {
  id: string;
  arrivalTime: Date;
  departureTime: Date;
  startStationId: string;
  endStationId: string;
  stationsBetween?: Station[];
  startStation?: Station;
  endStation?: Station;
  train?: Train[];
}
