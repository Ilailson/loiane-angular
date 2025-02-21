// import { ResolveFn } from '@angular/router';
// export const courseResolver: ResolveFn<boolean> = (route, state) => {
//   return true;
// };

// ng g resolver courses/guards/course



import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../../courses/containers/courses/services/courses.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver {

  //   return of({ _id: '', name: '', category: '', lessons: [] });
  // }

  constructor(private service: CoursesService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    if ( route.params && route.params['id'] ) {
        return this.service.loadById(route.params['id']);
    }
    return of({ _id: '', name: '', category: '', lessons: [] });
  }

}
