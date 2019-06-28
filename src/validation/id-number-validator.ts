import { markets, validationCodes } from "../common/constants";
import { IFormControl } from "../interfaces/i-form-control";
import { validateEstonianIdNumber } from "./estonia/estomian-id-number";
import { validateLithuaniaIdCard } from "./lithuania/lithuania-id-number";
import { getValidationMessage, findControlByName } from "../common/helpers";

export function validateIdNumber(control: IFormControl) {
    // to prevent overriding of the previous rule
    if (!control.isValid) {
        return;
    }

    switch (control.formSettings.formMeta.market) {
        case markets.estonia:

            const docType = validateEstonianIdNumber(control.value);
            control.isValid = Boolean(docType);

            if (control.isValid) {
                const controlName = control.controlName.split(".");
                const controlNameToFind = controlName.length > 1
                    ? `${controlName[0]}.identificationDocumentType`
                    : "identificationDocumentType";

                const docNumberTypeControl = control.controlContainer[controlNameToFind];

                if (docNumberTypeControl && Array.isArray(docNumberTypeControl.elementRef.current.state.options)) {

                    const option: any = (docNumberTypeControl.elementRef.current.state.options as string[] || [])
                        .find((o: any) => o.value === docType);

                    if (option) {

                        docNumberTypeControl.value = option.value;
                        docNumberTypeControl.elementRef.current.setState({ buttonText: option.label });
                    }
                }
            }

            break;

        case markets.lithuania:

            control.isValid = validateLithuaniaIdCard(control.value);
            break;

        default:
            return;
    }

    if (!control.isValid) {
        control.validationMessage = getValidationMessage(control, validationCodes.invalid);
        return;
    }
}