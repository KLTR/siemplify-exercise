import { Injectable } from '@angular/core';
import { ID, QueryEntity, filterNil } from '@datorama/akita';
import { EmployeesStore, EmployeesState } from './employees.store';
import { Employee } from './employees.model';
import { map, filter, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeesQuery extends QueryEntity<EmployeesState, Employee> {

  activeEmployees$ = this.selectActive();
  selectedEmployees$ = combineLatest(
    this.select(state => state.cityFilter),
    this.select(state => state.departmentFilter),
    this.select(state => state.searchTerm),
    this.selectActive(),
    this.getFilteredEmployees
  )

  isLoading$ = this.selectLoading();
  cityFilterOptions$ = this.activeEmployees$.pipe(
    map(employees => employees.map(e => e.city)),
  );

  departmentFilterOptions$ = this.activeEmployees$.pipe(
    map(employees => employees.map(e => e.department))
  );

  idsInUse$ = this.selectAll().pipe(
    map(employees => employees.map(e => e.id))
  );

  searchTerm$ = this.select('searchTerm');
  page$ = this.select('page');
  city$ = this.select('cityFilter');
  department$ = this.select('departmentFilter');

  idsInUse = this.getValue().ids;

  get page(){
    return this.getValue().page;
  }
  get city(){
    return this.getValue().cityFilter;
  }
  get department(){
    return this.getValue().departmentFilter;
  }
  get searchTerm(){
    return this.getValue().searchTerm;
  }


  constructor(protected store: EmployeesStore) {
    super(store);
  }

  private getFilteredEmployees(cityFilter, departmentFilter,searchTerm: string, employees): Employee[] {
    if(cityFilter) {
      employees = employees.filter(e => e.city === cityFilter);
    } else {
      if(departmentFilter){
        employees = employees.filter(e => e.department === departmentFilter)
      }
    }
    if(searchTerm !== ''){
      const names = searchTerm.split(" ");
      //if input contains 2 values should split into 2 names one will be first, other will be last. (doesn't matter which's first or second)
      if(names.length === 1){
        employees = employees.filter(e => e.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || e.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      } else if(names.length === 2){
        employees = employees.filter(e =>
          (e.firstName.toLowerCase().indexOf(names[0].toLowerCase()) > -1 || e.lastName.toLowerCase().indexOf(names[0].toLowerCase())  > -1) &&
          (e.firstName.toLowerCase().indexOf(names[1].toLowerCase()) > -1 || e.lastName.toLowerCase().indexOf(names[1].toLowerCase())  > -1)
        );

      } else {
        //if more then 2 names then should return empty list;
        return [];
      }

    }
    return employees;
  }

}
