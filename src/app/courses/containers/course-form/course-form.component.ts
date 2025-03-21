import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators} from '@angular/forms'; // +
import { CoursesService } from '../courses/services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson'; // +
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup; //+

  constructor(
    private location: Location,
    private snackBar: MatSnackBar,
    private service: CoursesService,
    private formbuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {
   }

  ngOnInit() {
    const course: Course = this.route.snapshot.data['course'];

    this.form  = this.formbuilder.group({
        _id: [course._id],
        name: [course.name,[Validators.required
                  ,Validators.minLength(5)
                  ,Validators.maxLength(100)]
              ],
        category: [course.category,[Validators.required]],
        lessons: this.formbuilder.array(this.retrieveLessons(course), Validators.required)
      });
  }

  private retrieveLessons(course: Course ) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach((lesson) => lessons.push(this.createLesson(lesson)));
    }
    else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = {id: '', name: '', youtubeUrl: ''}){
      return this.formbuilder.group({
        id: [lesson.id],
        name: [lesson.name, [Validators.required
          ,Validators.minLength(5)
          ,Validators.maxLength(100)]],
        youtubeUrl: [lesson.youtubeUrl, [Validators.required
          ,Validators.minLength(10)
          ,Validators.maxLength(11)]]
      })
  }

getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
}

AddNewLesson() {
const lessons = this.form.get('lessons') as UntypedFormArray;
lessons.push(this.createLesson());

}

removeLesson(index: number) {
  const lessons = this.form.get('lessons') as UntypedFormArray;
  lessons.removeAt(index);
}

onSubmit(): void {
  if (this.form.valid) {
    this.service.save(this.form.value)
      .subscribe(result => this.onSucess(), error => this.onError());
  } else {
    this.formUtils.validateAllFormFields(this.form);
  }
}
  onCancel(){
    this.location.back();//voltar pagina
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso',
      'Fechar', {
        duration: 5000 // Duração em milissegundos (5 segundos)
    });
  }

  private onSucess(){
    this.snackBar.open('Curso salvo com sucesso',
      'Fechar', {
        duration: 2000 // Duração em milissegundos (5 segundos)
    });
  }
}
