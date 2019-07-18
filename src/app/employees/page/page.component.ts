import { HttpService } from './../../services/http.service';
import { tap } from 'rxjs/operators';
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { EmployeesService } from './../state/employees.service';
import { EmployeesQuery } from './../state/employees.query';
import { Employee } from './../state/employees.model';
import { Observable } from 'rxjs';
import { EMPLOYEES_PAGINATOR } from '../employees-paginator';
import { PaginatorPlugin } from '@datorama/akita';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {
  employees$: Observable<Employee[]>;
  isLoading$: Observable<boolean>;
  cityFilterOptions$: Observable<string[]>;
  departmentFilterOptions$: Observable<string[]>;
  page$: Observable<number>
  selectedCity$: Observable<string>;
  selectedDepartment$:  Observable<string>;
  searchTerm$: Observable<string>;
  pageSize: number;
  constructor(
    @Inject(EMPLOYEES_PAGINATOR)
    private paginatorRef: PaginatorPlugin<Employee>,
    private employeesQuery: EmployeesQuery,
    private employeesService: EmployeesService,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.employees$ = this.employeesQuery.selectedEmployees$;
    this.isLoading$ = this.employeesQuery.isLoading$;
    this.cityFilterOptions$ = this.employeesQuery.cityFilterOptions$;
    this.departmentFilterOptions$ = this.employeesQuery.departmentFilterOptions$;
    this.selectedCity$ = this.employeesQuery.city$;
    this.selectedDepartment$ = this.employeesQuery.department$;
    this.searchTerm$ = this.employeesQuery.searchTerm$;
    this.http.getPageSize().subscribe(res => {
      this.pageSize = res.pageSize;
      this.getPage(this.employeesQuery.page);
    });
  }

  edit(employee: Employee) {
    this.employeesService.edit(employee);
  }

  getPage(page) {
    // Reset filters to clear UI filters.
   this.employeesService.resetFilters();
   this.paginatorRef.setPage(page);
   const requestFn = () => this.employeesService.get({ page: page, pageSize: this.pageSize });
   this.paginatorRef.getPage(requestFn).pipe(
     tap(res => {
       // set all results from pagination to active Entity
       const activeIds = res.data.map((employee: Employee) => employee.id);
       this.employeesService.setActive(activeIds);
      })
   ).subscribe();
  }

  updateSearchTerm(term) {
  this.employeesService.updateSearchTerm(term);
  }
  updateDepartmentFilter(department) {
    this.employeesService.updateDepartmentFilter(department);
  }
  updateCityFilter(city) {
    this.employeesService.updateCityFilter(city);
  }
}
