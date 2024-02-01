
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';

import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentsDetailsComponent } from './assignments/assignments-details/assignments-details.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { RouterModule, Routes } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { AssignmentsPaginatorComponent } from './assignments/assignments.paginator/assignments.paginator.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatStepperModule} from "@angular/material/stepper";
import { LoginDialogComponent } from './shared/components/login-dialog/login-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
const routes:Routes = [
  {path: '', component: AssignmentsComponent},
  {path: 'home', component: AssignmentsComponent},
  {path: 'add', component: AddAssignmentComponent, canActivate: [AuthGuard], data: { roles: ['user','admin']} },
  {path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate: [AuthGuard], data: { roles: ['user','admin'] }},
  {path: 'assignment/:id', component: AssignmentsDetailsComponent},
]
registerLocaleData(localeFr);
@NgModule({
  declarations: [

    AppComponent,
    AssignmentsComponent, AssignmentsDetailsComponent,
    RenduDirective,
    AddAssignmentComponent,
    EditAssignmentComponent,
    AssignmentsPaginatorComponent,
    LoginDialogComponent,
  ],
  imports: [
    MatDialogModule,
    MatStepperModule,
    MatSidenavModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatInputModule, MatFormFieldModule,
    MatDatepickerModule, MatNativeDateModule, MatListModule,
    MatCardModule, MatCheckboxModule, MatSlideToggleModule, MatToolbarModule,
    FormsModule, HttpClientModule,
    RouterModule.forRoot(routes),
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'fr-FR' } // Définit la locale à 'fr-FR'
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
