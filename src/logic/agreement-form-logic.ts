import { IFormSettings, IFieldSetSettings } from "../interfaces/i-form-settings";
import { IFormState } from "../interfaces/i-form-state";
import { defaultValidationErrorHandler } from "../common/response-error-handler";
import { IValidationError } from "../interfaces/i-responses";
import { serializeFormToJSON } from "../common/mappers";
import { errorType } from "../common/constants";
import { showMainSpinner, hideMainSpinner } from "../common/helpers";

export function addAgreementFormProps(props: IFormSettings) {

    return Object.assign(props, {
        handlers: {

            async onFormSubmit(formState: IFormState) {

                showMainSpinner();
                try {

                    const data = serializeFormToJSON(formState);

                    const response = await fetch('/Umbraco/Api/Agreement/Post', {
                        method: "POST",
                        mode: "cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)
                    })

                    const json = await response.json();
                    
                    if (json.errorType === errorType.validation && json.invalidFields.length) {
                        defaultValidationErrorHandler(json as IValidationError, this);
                    }

                } catch (error) {

                    console.error(error, "ResponseError");
                }

                hideMainSpinner();
            }
        }
    });
}


export function addDevAgreementFormProps(props: IFormSettings) {

    return props;
}