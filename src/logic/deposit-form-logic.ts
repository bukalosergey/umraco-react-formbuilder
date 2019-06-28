import { IFormSettings, IFieldSetSettings } from "../interfaces/i-form-settings";
import { IFormState } from "../interfaces/i-form-state";
import { defaultValidationErrorHandler } from "../common/response-error-handler";
import { IValidationError } from "../interfaces/i-responses";
import { serializeFormToJSON } from "../common/mappers";
import { errorType } from "../common/constants";

export function addDepositFormProps(props: IFormSettings) {

    return Object.assign(props, {
        handlers: {

            async onFormSubmit(formState: IFormState) {

                try {

                    const data = serializeFormToJSON(formState);

                    const response = await fetch('/Umbraco/Api/DepositApplication/Post', {
                        method: "POST",
                        mode: "cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)
                    });

                    const json = await response.json();

                    if (json.errorType === errorType.validation && json.invalidFields.length) {
                        defaultValidationErrorHandler(json as IValidationError, this);
                    }

                } catch (error) {

                    console.error(error, "ResponseError");
                }
            }
        }
    });
}


export function addDevDepositFormProps(props: IFormSettings) {

    const firstSection = props.controls[0] as IFieldSetSettings;
    const firstnameControl = firstSection && firstSection.controls.find(c => c.controlName === "firstname");

    if (firstnameControl) {

        firstnameControl.customValidation = function (control) {

            if (control.value === "zzz") {
                control.isValid = false;
                control.validationMessage = "it is invalid";
            } else {
                control.isValid = true;
                control.validationMessage = "";
            }
        }
    }

    return props;
}