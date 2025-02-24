import { Injectable } from '@angular/core';
import { Course } from '../../../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

private readonly API = 'api/courses';

constructor(private httpClient: HttpClient) { }

//delay. testando spinner
  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      // delay(1000),
      tap(courses => console.log(courses))
    );
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>) {
    console.log('Informação record', record);
    if(record._id){
      // console.log('Update');
      return this.update(record);
    }
    // console.log('Created');
    return this.create(record);

  }

  private create(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record);
  }

  private update(record: Partial<Course> ){
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record);
  }

   remove(id: string ){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

}
