import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }


  public static getValidationErrorMessage(validatorName: string, validatorValue?: any, labelName?: string): any {
    const config = {
      required: `Field is required.`,
      email : `Invalid Email`,
      invalidPassword: 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      maxlength: `The field can't contain more than ${validatorValue.requiredLength} characters.`,
      minlength: `The field must contain atleast ${validatorValue.requiredLength} characters.`
    };

    return config[validatorName];
  }


  passwordValidator(control: AbstractControl): any {
    if (!control.value) { return; }

    // {8,22}           - Assert password is between 8 and 22 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    // (?!.*\s)          - Spaces are not allowed
    return (control.value.match(/^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{8,22}$/)) ? '' : { invalidPassword: true };
  }

}
