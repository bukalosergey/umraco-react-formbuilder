import { IFormSettings, IFieldSetSettings } from "../interfaces/i-form-settings";
import { IFormState } from "../interfaces/i-form-state";
import { defaultValidationErrorHandler } from "../common/response-error-handler";
import { IValidationError } from "../interfaces/i-responses";
import { serializeFormToJSON } from "../common/mappers";
import { errorType } from "../common/constants";
import { showMainSpinner, hideMainSpinner } from "../common/helpers";

export function addContactFormProps(props: IFormSettings) {

    return Object.assign(props, {
        handlers: {

            async onFormSubmit(formState: IFormState) {

                showMainSpinner();
                try {

                    const data = serializeFormToJSON(formState);

                    const response = await fetch('/Umbraco/Api/ContactApplication/Post', {
                        method: "POST",
                        mode: "cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)
                    })

                    const json = await response.json();
                    
                    if (json.errorType === errorType.validation && json.invalidFields.length) {
                        defaultValidationErrorHandler(json as IValidationError, this);
                    }
                    
                    if (json.errorType === errorType.internalServerError) {
                        showContetnt(json.content as string);
                    }

                } catch (error) {

                    console.error(error, "ResponseError");
                }

                hideMainSpinner();
            }
        }
    });
}


export function addDevContactFormProps(props: IFormSettings) {

    const firstSection = props.controls[0] as IFieldSetSettings;
    const nameControl = firstSection && firstSection.controls.find(c => c.controlName === "name");

    if (nameControl) {

        nameControl.customValidation = function (control) {

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


function showContetnt(content: string) {


    const container = $("[umbraco-form='contact-form'").hide();
    const tempContent = $(content);
    container.before(tempContent);

    tempContent.find("button").on("click", () => {

        container.show();
        tempContent.remove();     
    })
}