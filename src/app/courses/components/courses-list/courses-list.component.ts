import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  // @Input()... tudo que passar para esse componente como lista de curso
  @Input() courses: Course[] = [];

  //@Output... Tudo que está saindo do componente
  @Output() add = new EventEmitter(false);

  @Output() edit = new EventEmitter(false);


                                          //acitions
  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(
   ) {}

   onAdd() {
    this.add.emit(true);
  }

  onEdit(course: Course) {
    this.edit.emit(course);
  }

}
