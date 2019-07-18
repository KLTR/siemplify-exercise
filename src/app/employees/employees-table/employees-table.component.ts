import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';
import { Employee } from './../state/employees.model';
import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatDialog } from '@angular/material';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesTableComponent implements AfterViewInit {
@Input() employees: Employee[]
@Input() totalEmployees: number = 100;
@Input() isLoading: boolean = true;
@Input() searchTerm$: Observable<string>;
searchedWords: any;
@Output() edit = new EventEmitter<Employee>();
@Output() changePage = new EventEmitter<any>();
@Input() pageSize: number;
displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age', 'city', 'street', 'department', 'edit'];

isRateLimitReached = false;

@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(public editDialog: MatDialog) {}

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(() => this.changePage.emit(this.paginator.pageIndex + 1)),
    ).subscribe();
    this.searchTerm$.subscribe( res =>{
      this.searchedWords = res.toLowerCase().split(" ");
     });
  }

editEmployee(employee){
    const dialogRef = this.editDialog.open(EditDialogComponent, {
      data: employee
    });
    dialogRef.afterClosed().subscribe( newEmployee => {
      if(newEmployee){
        this.edit.emit(newEmployee);
      }
    })
  }
}
