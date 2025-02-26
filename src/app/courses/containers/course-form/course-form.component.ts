import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators} from '@angular/forms';
import { CoursesService } from '../courses/services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  //mesma coisa que declarar no construtor
  form  = this.formbuilder.group({
    _id: [''],
    name: ['',[Validators.required
              ,Validators.minLength(5)
              ,Validators.maxLength(100)]
          ],
    category: ['',[Validators.required]]
  });

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatorio';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength'].requiredLength : 5;
      return `Tamanho mínimo requerido ${requiredLength} caracteres.`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength'].requiredLength : 200;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }
    return 'Campo invalido';
  }

  constructor(
    private location: Location,
    private snackBar: MatSnackBar,
    private service: CoursesService,
    private formbuilder: NonNullableFormBuilder,
    private route: ActivatedRoute) {
    // this.form
   }

  ngOnInit() {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })

  }

  onSubmit(){
      if (this.form.invalid) {
    return;
  }
    this.service.save(this.form.value)
                .subscribe(
                  result => this.onSucess(),
                  error => {
                    this.onError();
                  }
                );
    this.onCancel();
}

// onSubmit() {
//   if (this.form.invalid) {
//     return;
//   }

//   this.service.save(this.form.value).subscribe({
//     next: () => this.onSucess(),
//     error: () => this.onError(),
//   });
// }

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
