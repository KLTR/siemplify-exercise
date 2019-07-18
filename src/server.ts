import * as faker from 'faker';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';


const count = 100;
const data = [];
for (let i = 0; i < count; i++) {
  let random = faker.random.number(2);
  data.push({
    id: faker.random.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.random.number({min: 18, max: 68}),
    city: faker.address.city(),
    street: faker.address.streetName(),
    department: faker.name.jobArea(),
  });
}

export function getAllData(){
  return data;
}


export function getData(params) {
  const merged = { ...params };
  const offset = (merged.page - 1) * +merged.pageSize;
  let paginatedItems = [];
  let lastPage = 10;

    // Get all Data
    paginatedItems = data.slice(offset, offset + +merged.pageSize)
    lastPage = Math.ceil(data.length / +merged.pageSize)

  return {
    currentPage: merged.page,
    perPage: +merged.pageSize,
    total: data.length,
    lastPage: lastPage,
    data: paginatedItems
  };
}

export const getAllEmployees = function() {
  return timer(2000).pipe(mapTo(getAllData()));
};

export const getEmployees = function(params) {
  return timer(2000).pipe(mapTo(getData(params)));
};

