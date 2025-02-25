import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMatreialModule } from './app-matreial/app-matreial.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from '../courses/components/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmationDialogComponent //reutilizando componente
  ],
  imports: [
    CommonModule,
    AppMatreialModule,
    MatDialogModule
  ],
  exports: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmationDialogComponent //reutilizando componente
  ]
})
export class SharedModule { }
