import { IFormControl } from "../interfaces/i-form-control";
import { validationCodes } from "../common/constants";

export function executeUiValidation(control: IFormControl) {

    if (!Array.isArray(control.validations)) {
        return;
    }

    for (const validation of control.validations) {
        // stop on first validation
        if (!control.isValid) {
            return;
        }

        let isValid = true;
        switch (validation.code) {
            case validationCodes.mustBeGreater:
                // ssn age is controled by this validation rule too, but it is implemented as a custom validation
                isValid = control.controlName.toLocaleLowerCase().indexOf("ssn") > -1 
                    ? true
                    : Number(control.value) > Number(validation.value);

                break;

            case validationCodes.mustBeLess:
                // ssn age is controled by this validation rule too, but it is implemented as a custom validation
                isValid = control.controlName.toLocaleLowerCase().indexOf("ssn") > -1
                    ? true
                    : Number(control.value) < Number(validation.value);

                break;

            case validationCodes.mustMatchPattern:

                isValid = new RegExp(String(validation.value)).test(String(control.value));
                break;

            case validationCodes.mustMatch:

                isValid = control.value === control.controlContainer[String(validation.value)].value;
                break;

            case validationCodes.mustNotMatch:

                isValid = control.value !== control.controlContainer[String(validation.value)].value;
                break;

            default:
                break;
        }

        control.isValid = isValid;
        control.validationMessage = isValid ? "" : validation.message;
    };
}

