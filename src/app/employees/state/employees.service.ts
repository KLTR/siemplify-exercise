import { EmployeesStore } from './employees.store';
import { Injectable } from '@angular/core';
import { PaginationResponse, IDS, transaction} from '@datorama/akita';
import { Employee } from './employees.model';
import { Observable } from 'rxjs';
import { getEmployees} from '../../../server';
@Injectable({ providedIn: 'root' })
export class EmployeesService {

  constructor(
    private employeesStore: EmployeesStore
    ){

  }
  get(params: any): Observable<PaginationResponse<Employee>> {
    return getEmployees(params);
  }


  updatePage(page: number): void{
    this.employeesStore.update({page})
  }

  setActive(ids: IDS): void {
    ids = [].concat(ids);
    this.employeesStore.setActive(ids);
  }

  @transaction()
  resetFilters(): void {
    this.employeesStore.update({cityFilter: null})
    this.employeesStore.update({departmentFilter: null})
    this.employeesStore.update({searchTerm: ''})
  }

  @transaction()
  updateDepartmentFilter(departmentFilter: string): void{
    this.employeesStore.update({cityFilter: null})
    this.employeesStore.update({departmentFilter})
  }

  @transaction()
  updateCityFilter(cityFilter: string): void{
    this.employeesStore.update({departmentFilter: null})
    this.employeesStore.update({cityFilter});
  }

  updateSearchTerm(searchTerm: string): void {
    this.employeesStore.update({searchTerm});
  }

  @transaction()
  edit(newEmpWithOldID: any): void {
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
  }
}
