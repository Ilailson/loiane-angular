import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from './services/courses.service';
import { catchError, Observable, of } from 'rxjs';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;

  displayedColumns = ['name', 'category'];

  // coursesService: CoursesService;

  constructor(private coursesService: CoursesService) {
    // this.coursos = []; ou isso  courses: Course[] = []; ...Mesma coisa

    // this.coursesService = new CoursesService();

    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        console.log(error);
        return of([])
      })
    );

    onError(errorMensagem: string) {
      this.dialog.open(DialogDataExampleDialog, {
        data: {
          animal: 'panda',
        },
      });


  }

  ngOnInit(): void {

  }


}
