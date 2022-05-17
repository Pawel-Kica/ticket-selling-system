import { employeesTestData } from '../../prisma/seed/data/employees.seed.data';

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
