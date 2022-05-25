import { bossUserID } from './id.test.data';
import { formatArrayResponse } from './manager.test.data';

export const viewAllTrainsResponse = {
  data: formatArrayResponse([
    {
      id: 'train1',
      routeId: 'route1',
      bossId: bossUserID,
      driverId: 'employee16',
      driverHelperId: 'employee17',
      type: 'highSpeed',
    },
    {
      id: 'train2',
      routeId: 'route2',
      bossId: bossUserID,
      driverId: 'employee18',
      driverHelperId: 'employee19',
      type: 'passenger',
    },
    {
      id: 'train3',
      routeId: 'route3',
      bossId: 'user13',
      driverId: 'employee20',
      driverHelperId: 'employee21',
      type: 'regional',
    },
  ]),
  status: 200,
  omit: [],
};
