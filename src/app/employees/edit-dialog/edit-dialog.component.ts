import { ID } from '@datorama/akita';
import { Employee } from './../state/employees.model';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef} from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesQuery } from '../state/employees.query';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  newEmp: Employee;
  formGroup: FormGroup;
  ids: ID[] = [];
  formError: string = 'This field is required';
  constructor(
    public employeesQuery: EmployeesQuery,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) {

    }

  onNoClick(): void {
    this.dialogRef.close(null);
  }
  ngOnInit() {
    this.newEmp = {...this.data};
    this.employeesQuery.idsInUse$.subscribe(res => this.ids = res);
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      'id': [this.newEmp.id, [Validators.required,  this.checkInUseId.bind(this)]],
      'firstName': [this.newEmp.firstName, Validators.required],
      'lastName': [this.newEmp.lastName, Validators.required],
      'age': [this.newEmp.age, Validators.required],
      'city': [this.newEmp.city, Validators.required],
      'street': [this.newEmp.street, Validators.required],
      'department': [this.newEmp.department, Validators.required],
    });
  }

  checkInUseId(control) {
    // check if new id not in use unless it's the same id
    return  (this.ids.indexOf(control.value) !== -1 && control.value !== this.newEmp.id) ? {'alreadyInUse': true} : null;

  }
  getErrorEmail() {
    return this.formGroup.get('id').hasError('required') ? 'Field is required' :
           this.formGroup.get('id').hasError('alreadyInUse') ? 'This ID is already in use' : '';
  }

  onSubmit(formRes){
    this.dialogRef.close({...formRes, oldId: this.newEmp.id});
  }
}
