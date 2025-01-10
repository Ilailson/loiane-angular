import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMatreialModule } from './app-matreial/app-matreial.module';



@NgModule({
  declarations: [
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    AppMatreialModule
  ],
  exports: [ErrorDialogComponent]
})
export class SharedModule { }
