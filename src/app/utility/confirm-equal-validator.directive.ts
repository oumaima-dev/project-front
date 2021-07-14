import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';


@Directive({
    selector: '[appConfirmEqualValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmEqualValidatorDirective,
        multi: true
    }]
})
export class ConfirmEqualValidatorDirective implements Validator {
  /**
   * Attribute confirmPassword will be pass into validate method as control attribute
   * @Input(): we want to use this input field to pass in the field name that we want to compare confirmPassword field with(newPassword field)
   * return {notEqual: true} - if two value fields not match.
   * return null - if two value fields are match.
   */
    @Input() appConfirmEqualValidator = '';
    validate(control: AbstractControl): {[key: string]: any} | null {
        const controlToCompare = control.parent?.get(this.appConfirmEqualValidator);
        if (controlToCompare && controlToCompare.value !== control.value){
            return { notEqual: true};
        }
        return null;
    }
}
