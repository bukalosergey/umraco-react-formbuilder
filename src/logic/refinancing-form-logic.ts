import { IFormSettings, IFieldSetSettings } from "../interfaces/i-form-settings";
import { TfBankObservable } from "../types/observer-types";
import { components, errorType } from "../common/constants";
import { IFormState } from "../interfaces/i-form-state";
import { defaultValidationErrorHandler } from "../common/response-error-handler";
import { IValidationError } from "../interfaces/i-responses";
import { getCalculatorOptions } from "../common/tfbank-observer";
import { serializeFormToJSON } from "../common/mappers";

export function addRefinancigFormProps(props: IFormSettings) {

    return Object.assign(props, {
        handlers: {
            // subscribe to calculator changes
            onFormInit() {
                const context = window as Window & TfBankObservable;
                // sets calculator values to the form
                context.TF_BANK_OBSERVE_OBJECT.subscribe((_: any, prop: string, calculator: any) => {

                    if (prop === components.calculator) {

                        const calculatorControls = getCalculatorOptions(calculator);
                        this.setState((state: any) => Object.assign(state.controls, calculatorControls))
                    };
                });

                if (context.TF_BANK_OBSERVE_OBJECT && context.TF_BANK_OBSERVE_OBJECT.calculator) {
                    const calculatorControls = getCalculatorOptions(context.TF_BANK_OBSERVE_OBJECT.calculator);
                    this.setState((state: any) => Object.assign(state.controls, calculatorControls))
                }
            },

            async onFormSubmit(formState: IFormState) {

                try {

                    const data = serializeFormToJSON(formState);
                    const response = await fetch('/Umbraco/Api/RefinancingApplication/Post', {
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
            }
        }
    });
}

export function addDevRefinancigFormProps(props: IFormSettings) {

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