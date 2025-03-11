import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }


  getErrorMessageFromField(field: UntypedFormControl) {
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

  getFormArrayFieldErrorMessage(formGroup: UntypedFormGroup, formArrayName: string,
                                fieldName: string,index: number) {
    const formArray = formGroup.get(formArrayName) as UntypedFormGroup;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);

  }

  isFormArrayRequed(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid &&  formArray.hasError('required')  && formArray.touched;
  }

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsDirty({ onlySelf: true });
      }
      else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        control.markAsDirty({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });

  }

}

