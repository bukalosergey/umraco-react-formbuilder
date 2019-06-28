import { IFormSettings } from "../interfaces/i-form-settings";
import { ControlCustomValidation } from "../interfaces/i-control-validation-rule";
import { findControlByName } from "../common/helpers";
import { validationCodes } from "../common/constants";
import { IFormControl } from "../interfaces/i-form-control";

export function setValidators(props: IFormSettings, validatorList: { [key: string]: ControlCustomValidation }) {

    Object.keys(validatorList).forEach(key => {

        const control = findControlByName(key, props.controls);

        if (control) {

            control.customValidation = validatorList[key];
        }
    })
}

export function getBaseValidator(fn: (value: any) => boolean) {

    return function (control: IFormControl) {

        control.isValid = fn(control.value);

        if (control.isValid) {
            control.validationMessage = undefined;
            return;
        }

        const code = Array.isArray(control.validations) &&
            control.validations.find(c => c.code === validationCodes.invalid);

        control.validationMessage = code && code.message || validationCodes.invalid;
    }
}
