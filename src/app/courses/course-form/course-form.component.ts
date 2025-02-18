import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup; 


  constructor(private formbuilder: FormBuilder) {
    this.form = this.formbuilder.group({
      name: '',
      category: ''
    })
   }

  ngOnInit() {
  }


  onSubmit(){

  }

  onCancel(){

  }

}
