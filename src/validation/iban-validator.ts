import { isValid } from "iban";
import { IFormControl } from "../interfaces/i-form-control";
import { validationCodes, markets } from "../common/constants";
import { generateFinlandBic } from "./bic-mapping";

export function validateIban(control: IFormControl) {
 
    if (!control.isValid) {
        return;
    }

    control.isValid = isValid(control.value);

    if (!control.isValid) {
        const rule = (control.validations || []).find(c => c.code === validationCodes.invalid);
        control.validationMessage = rule ? rule.message : validationCodes.invalid;
        return;
    }

    if (control.formSettings.formMeta.market === markets.finland) {

        const bicControl = control.controlContainer["bic"];
        const bic = generateFinlandBic(control.value);

        if (bic && bicControl) {
            bicControl.elementRef.current.setState({ value: bic });
            bicControl.elementRef.current.blur();
        }
    }
}