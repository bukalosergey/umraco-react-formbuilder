import { metaDataFormFields } from "./constants";
import { IFormSettings, FormSettingsControls } from "../interfaces/i-form-settings";
import { IFormControlSettings } from "../interfaces/i-form-control-settings";
import { IFormControl } from "../interfaces/i-form-control";

export function showMainSpinner() {
    
    $(".main-spinner").show();
}

export function hideMainSpinner() {
    
    $(".main-spinner").hide();
}

// export function getMetaFieldsFromObject(obj: any): object {

//     return metaDataFormFields.reduce(
//         (object: any, key) => {
//             object[key] = obj[key];
//             return object;
//         },
//         {}
//     )
// }

export function findControlByName(name: string, controls: FormSettingsControls): IFormControlSettings<any> {

    for (const control of controls) {
        
        if ("controls" in control) {

            const c = findControlByName(name, control.controls);
            if (c) {
                return c;
            }

        } else if (control.controlName === name) {
            return control;
        }
    }
}

export function calculateAge(birthday: Date) { 
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function getValidationRule(control: IFormControl, code: string) {

    return (control.validations || [])
        .find(validation => validation.code === code);
}

export function getValidationMessage(control: IFormControl, code: string) {

    const rule = getValidationRule(control, code);
    return rule ? rule.message : code;
}