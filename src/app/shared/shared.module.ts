import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMatreialModule } from './app-matreial/app-matreial.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    AppMatreialModule,
    MatDialogModule
  ],
  exports: [ErrorDialogComponent]
})
export class SharedModule { }
