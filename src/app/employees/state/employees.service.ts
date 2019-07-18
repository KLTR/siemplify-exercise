import { EmployeesStore } from './employees.store';
import { Injectable } from '@angular/core';
import { PaginationResponse, IDS } from '@datorama/akita';
import { Employee } from './employees.model';
import { Observable } from 'rxjs';
import { getEmployees} from '../../../server';
@Injectable({ providedIn: 'root' })
export class EmployeesService {

  constructor(
    private employeesStore: EmployeesStore
    ){

  }
  get(params): Observable<PaginationResponse<Employee>> {
    console.log(params)
    return getEmployees(params);
  }


  updatePage(page){
    this.employeesStore.update({page})
  }

  set(state) {
    this.set(state);
  }

  setActive(ids: IDS): void {
    ids = [].concat(ids);
    this.employeesStore.setActive(ids);
  }

  resetFilters(): void {
    this.employeesStore.update({cityFilter: null})
    this.employeesStore.update({departmentFilter: null})
    this.employeesStore.update({searchTerm: ''})
  }

  updateDepartmentFilter(departmentFilter){
    this.employeesStore.update({cityFilter: null})
    this.employeesStore.update({departmentFilter})
  }
  updateCityFilter(cityFilter){
    this.employeesStore.update({departmentFilter: null})
    this.employeesStore.update({cityFilter});
  }

  updateSearchTerm(searchTerm) {
    this.employeesStore.update({searchTerm});
  }

  edit(newEmpWithOldID: any) {
    // create a new object newEmp without the oldId.
    const { oldId, ...newEmp } = newEmpWithOldID;
    this.employeesStore.update(oldId, newEmp);

    // need to reset active
    if(oldId !== newEmp.id){
      this.employeesStore.addActive(newEmp.id)
      this.employeesStore.updateActive(active => {
        return {
          ...active
        }
      });
    }
    // this.employeesStore.removeActive(oldId);
    // this.employeesStore.addActive(newEmp.id)
  }
}
