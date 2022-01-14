import { Component, OnInit , Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatorService } from 'src/app/servies/validator.service';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})
export class ValidatorComponent {

  constructor() { }

  @Input() control: FormControl;
  @Input() labelName?: string;

  get errorMessage(): boolean {
    for (const propertyName in this.control.errors) {      
      if (
        this.control.errors.hasOwnProperty(propertyName)
      ) {
        return ValidatorService.getValidationErrorMessage(
          propertyName,
          this.control.errors[propertyName],
          this.labelName
        );
      }
    }

    return undefined;
  }


}
