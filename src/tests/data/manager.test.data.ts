import { State } from '@prisma/client';
import {
  employeesTestData,
  testEmployeeId,
} from '../../prisma/seed/data/employees.seed.data';
import {
  trainPrefix,
  carriagePrefix,
  stationPrefix,
} from '../../prisma/seed/data/prefixes';
import { NotFoundErrorInstance } from '../helpers/responses.dto';
import { testUserId } from './id.test.data';
import { ticketOmitProperties } from './tickets.test.data';

function formatEmployeesResponse(employees: any[]) {
  const result = {};
  employees.forEach((e, idx) => {
    result[idx] = e;
  });
  return result;
}

export const getAllEmployeesObj = {
  data: formatEmployeesResponse(employeesTestData),
  status: 200,
  omit: [],
};

export const getSingleEmployeeObj = {
  valid: {
    param: testEmployeeId,
    response: {
      data: employeesTestData.filter((e) => e.id == testEmployeeId)[0],
      status: 200,
      omit: [],
    },
  },
  invalid: {
    param: '12',
    response: NotFoundErrorInstance,
  },
};

const buyTicketByManagerBody = {
  state: State.bought,
  userId: testUserId,
  seat: 40,
  trainId: `${trainPrefix}1`,
  carriageId: `${carriagePrefix}1`,
  startStationId: `${stationPrefix}1`,
  endStationId: `${stationPrefix}4`,
};

const bookTicketByManagerBody = {
  ...buyTicketByManagerBody,
  state: State.bought,
  seat: 39,
};

export const createTicketByManagerObj = {
  valid: {
    buy: {
      body: buyTicketByManagerBody,
      response: {
        data: buyTicketByManagerBody,
        status: 200,
        omit: ticketOmitProperties,
      },
    },
    book: {
      body: bookTicketByManagerBody,
      response: {
        data: bookTicketByManagerBody,
        status: 200,
        omit: ticketOmitProperties,
      },
    },
  },
  invalid: {},
};
