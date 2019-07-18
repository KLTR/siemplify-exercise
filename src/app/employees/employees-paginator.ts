import { inject, InjectionToken } from '@angular/core';
import { EmployeesQuery } from './state/employees.query';
import { PaginatorPlugin } from '@datorama/akita';

export const EMPLOYEES_PAGINATOR = new InjectionToken('EMPLOYEES_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const employeeQuery = inject(EmployeesQuery);
    return new PaginatorPlugin(employeeQuery).withControls().withRange();
  }
});
