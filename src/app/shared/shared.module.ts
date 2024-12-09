import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslationLoader } from '../translation.loader';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogWrapperComponent } from './components/dialog-wrapper/dialog-wrapper.component';
import { EmployeeDetailsFormComponent } from './components/employee-details-form/employee-details-form.component';
import { ChangeReporteeFormComponent } from './components/change-reportee-form/change-reportee-form.component';
import { DeleteEmployeeFormComponent } from './components/delete-employee-form/delete-employee-form.component';

@NgModule({
  declarations: [
    ActionMenuComponent,
    DialogWrapperComponent,
    EmployeeDetailsFormComponent,
    ChangeReporteeFormComponent,
    DeleteEmployeeFormComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslationLoader(http),
        deps: [HttpClient],
      },
    }),
  ],
  exports: [ActionMenuComponent, MatButtonModule, MatIconModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSnackBarModule],
})
export class SharedModule {}
