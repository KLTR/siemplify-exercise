import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { HttpClientModule } from '@angular/common/http';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageComponent } from './employees/page/page.component';
import { EmployeesTableComponent } from './employees/employees-table/employees-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltersComponent } from './employees/filters/filters.component';
import { EditDialogComponent } from './employees/edit-dialog/edit-dialog.component';

import { HighlightDirective } from '@directives';
import {AppRoutingModule, MaterialModule } from '@modules';
import { HttpService } from '@services';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    EmployeesTableComponent,
    FiltersComponent,
    EditDialogComponent,
    HighlightDirective,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ContentLoaderModule.forRoot(),
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  entryComponents: [EditDialogComponent],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
