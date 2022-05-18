import {
  employeesTestData,
  testEmployeeId,
} from '../../prisma/seed/data/employees.seed.data';
import { NotFoundErrorInstance } from '../helpers/responses.dto';

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
