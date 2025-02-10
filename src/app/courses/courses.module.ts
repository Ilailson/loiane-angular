import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { AppMatreialModule } from '../shared/app-matreial/app-matreial.module';
import { CoursesComponent } from './courses/courses.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMatreialModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class CoursesModule { }
