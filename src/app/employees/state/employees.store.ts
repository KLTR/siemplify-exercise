import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, MultiActiveState } from '@datorama/akita';
import { Employee } from './employees.model';

export interface EmployeesState extends EntityState<Employee>, MultiActiveState {
  page: number;
}

const initialState = {
  page: 1,
  active: [],
  searchTerm: '',
  cityFilter: null,
  departmentFilter: null
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'employees' })
export class EmployeesStore extends EntityStore<EmployeesState> {
  constructor() {
    super(initialState);
  }
}
