// 2º
import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from './services/courses.service';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
   ) {
    this.refresh();
   }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courses$ = this.coursesService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        return of([]); // Retorna um observable vazio
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });

  }

  onRemove(course: Course) {
    //================= Perguntando se deseja remover o curso.
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover este curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open(
              'Curso removido com sucesso',
              'X',
              {
                duration: 2000, // Duração em milissegundos (2 segundos)
                verticalPosition: 'top', // Mostrar no topo
                horizontalPosition: 'center' // Centralizado horizontalmente
              }
            );
          },
          (error) => this.onError('Erro ao tentar remover curso.')
        );
      }
    });
  }

refresh(){
  this.courses$ = this.coursesService.list().pipe(
    catchError(error => {
      this.onError('Erro ao carregar cursos.');
      return of([]); // Retorna um observable vazio
    })
  );
}


}
