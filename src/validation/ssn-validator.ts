import { markets, validationCodes } from "../common/constants";
import { IFormControl } from "../interfaces/i-form-control";
import { validateEstoniaSsn, getAge } from "./estonia/esonian-ssn";
import { validateLatviaSsn } from "./latvia/latvia-ssn";
import { calculateAge, getValidationRule, getValidationMessage } from "../common/helpers";
import { validateLithuaniaSsn } from "./lithuania/lithuania-ssn";
import { validateNorwegianIdNumber, possibleAgeOfPersonWithIdNumber } from "./norway/norway-ssn";
import FinnishSSN from "./finland/finland-ssn";
import SwedishSSN from "./sweden/sweden-ssn";

export function validateSsn(control: IFormControl) {

    const mustBeGreater = getValidationRule(control, validationCodes.mustBeGreater);
    const mustBeLess = getValidationRule(control, validationCodes.mustBeLess);
    let age: number;

    switch (control.formSettings.formMeta.market) {
        case markets.estonia:

            control.isValid = validateEstoniaSsn(control.value);
            age = getAge(control.value);
            break;

        case markets.finland:

            const validationFn = FinnishSSN.parse(control.value);
            control.isValid = validationFn.valid;
            age = validationFn.ageInYears;
            break;

        case markets.germany:

            break;

        case markets.latvia:

            const validationLv = validateLatviaSsn(control.value)
            control.isValid = validationLv && validationLv.isValid;
            age = validationLv && calculateAge(validationLv.dateOfBirth);
            break;

        case markets.lithuania:

            const validationLt = validateLithuaniaSsn(control.value)
            control.isValid = validationLt && validationLt.isValid;
            age = validationLt && calculateAge(validationLt.dateOfBirth);
            break;

        case markets.norway:

            control.isValid = validateNorwegianIdNumber(control.value)
            age = possibleAgeOfPersonWithIdNumber(control.value);
            break;

        case markets.sweden:

            control.isValid = SwedishSSN.isSSn(control.value)
            age = control.isValid && calculateAge(SwedishSSN.getDateOfBirth(control.value))
            break;

        default:
            return;
    }

    if (!control.isValid) {
        control.validationMessage = getValidationMessage(control, validationCodes.invalid);
        return;
    }

    if (age && mustBeGreater && Number(mustBeGreater.value) > age) {
        control.isValid = false;
        control.validationMessage = mustBeGreater.message;
        return;
    }

    if (age && mustBeLess && Number(mustBeLess.value) < age) {
        control.isValid = false;
        control.validationMessage = mustBeLess.message;
        return;
    }
}