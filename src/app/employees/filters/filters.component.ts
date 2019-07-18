import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Employee } from '../state/employees.model';
import { MatSelect } from '@angular/material';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FiltersComponent implements OnInit {
  @Input() cities: string[];
  @Input() departments: string[];
  @Input() selectedCity: string;
  @Input() selectedDepartment: string;
  @Output() edit = new EventEmitter<Employee>();
  @Output() changePage = new EventEmitter<any>();
  @Output() updateSearchTerm = new EventEmitter<string>();
  @Output() updateCityFilter = new EventEmitter<string>();
  @Output() updateDepartmentFilter = new EventEmitter<string>();
  @ViewChild('departmentSelect', {static: false}) departmentSelector :MatSelect
  @ViewChild('citySelect', {static: false}) citySelector: MatSelect
  constructor() { }

  ngOnInit() {
  }
  applyFilter(searchTerm: string) {
    this.updateSearchTerm.emit(searchTerm);
  }
  updateDepartment(event: any) {
    this.citySelector.writeValue(null)
    let selectedDepartment;
    if(!event.isUserInput){
      return
    }
    if(event.source.selected){
      selectedDepartment = event.source.value
      this.updateDepartmentFilter.emit(selectedDepartment);
    }
  }

  updateCity(event: any){
    this.departmentSelector.writeValue(null)
    let selectedCity;
    if(!event.isUserInput){
      return
    }
    if(event.source.selected){
      selectedCity = event.source.value
      this.updateCityFilter.emit(selectedCity);
    }
  }
}
