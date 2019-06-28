import { IFormState, FormControlContainer } from "../interfaces/i-form-state";
import { IFormControl } from "../interfaces/i-form-control";
//import { IControlValidationRule } from "../interfaces/i-control-validation-rule";
import { IControlConditionRule } from "../interfaces/i-form-control-condition";

export const ValidationService = {

    // validateForm(form: IFormState) {

    // },

    // processAllControls(control: IFormControl): FormControlContainer {

    //     if (!control.validationRules && !control.validationRules.length) {
    //         return;
    //     }

    //     const validatedControls = {} as FormControlContainer;

    //     control.validationRules.forEach((rule) => {

    //         if ('validation' in rule) {
    //             control.validationRules.forEach((rule) => {
    //                 validatedControls[control.controlName] = this.validateControl(control, <IControlValidationRule> rule);
    //             });
    //         }
    //     })

    //     return validatedControls;
    // },

    // applyRules(control: IFormControl): IFormControl {

    //     control.validationRules.forEach((rule) => {

    //         if ('validation' in rule) {
    //             this.validateControl(control, <IControlValidationRule> rule);
    //         } else {
    //             this.resolveControlCondition(control, <IControlConditionRule> rule);
    //         }
    //     })
   
    //     return control;
    // },

    // validateControl(control: IFormControl, rule: IControlValidationRule) {

    //     if ("equal" in rule.validation) {

    //         control.isValid = rule.validation.equal.value === control.value;
    //         control.invalidMessage = control.isValid ? "": `Value should be equal ${rule.validation.equal.value}`;

    //     } else if ("notEqual" in rule.validation) {

    //         control.isValid = rule.validation.notEqual !== control.value;
    //         control.invalidMessage = control.isValid ? "": `Value should not be equal ${rule.validation.notEqual.value}`;

    //     }

    //     return control;
    // }
    
}