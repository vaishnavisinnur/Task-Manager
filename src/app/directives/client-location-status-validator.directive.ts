import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appClientLocationStatusValidator]',
  providers: [ { provide: NG_VALIDATORS, useExisting: ClientLocationStatusValidatorDirective, multi: true }]
})
export class ClientLocationStatusValidatorDirective {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    let isValid = true;
    if (control.value.ClientLocation == 1 && control.value.Status == "Support") {
      isValid = false; //indicates invalid
    }

    if (isValid == true) {
      return null; //valid
    }
    else {
      return { clientLocationStatus: { valid: false } }; //invalid
    }
  }

}
