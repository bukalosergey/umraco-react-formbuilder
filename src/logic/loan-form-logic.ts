import { IFormSettings } from "../interfaces/i-form-settings";
import { TfBankObservable } from "../types/observer-types";
import { components, errorType, selectors } from "../common/constants";
import { IFormState } from "../interfaces/i-form-state";
import { defaultValidationErrorHandler } from "../common/response-error-handler";
import { IValidationError } from "../interfaces/i-responses";
import { getCalculatorOptions } from "../common/tfbank-observer";
import { serializeFormToJSON } from "../common/mappers";
import { showMainSpinner, hideMainSpinner } from "../common/helpers";
import { startSign } from "../common/signing";
import { getPromissoryNote, IPromissoryNote } from "../common/models/promissory-note.model";
import { ISigningComplete } from "../interfaces/i-signing";
import { ILoanResponse } from "../interfaces/i-loan-response";
import { IErrorResponse } from "../interfaces/i-error-response";
import { parseTemplate } from "../common/template-parser";
import { ControlCustomValidation } from "../interfaces/i-control-validation-rule";
import { setValidators } from "../validation/set-validators";
import { validateSsn } from "../validation/ssn-validator";
import { validateIban } from "../validation/iban-validator";
import { validateIdNumber } from "../validation/id-number-validator";

const loanForm = $(selectors.loanForm);
const responseContainer = $(selectors.responseContainer);
const calculator = $(selectors.calculator);

export function addLoanFormProps(props: IFormSettings) {

    setValidators(props, validatorList);

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

                    showMainSpinner();
                    const data = serializeFormToJSON(formState);
                    const response = await fetch('/Umbraco/Api/LoanApplication/Post', {
                        method: "POST",
                        mode: "cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)
                    });

                    const json = await response.json() as ILoanResponse | IErrorResponse;

                    if ("errorType" in json && json.errorType === errorType.validation && json.invalidFields.length) {
                        defaultValidationErrorHandler(json as IValidationError, this);
                        return hideMainSpinner();
                    }

                    setResponseContent(json as ILoanResponse);

                } catch (error) {

                    console.error(error, "ResponseError");
                }

                hideMainSpinner();
            }
        }
    });
}

export function addDevLoanFormProps(props: IFormSettings) {
 
    return props;
}


function setResponseContent(data: ILoanResponse) {

    loanForm.hide();
    calculator.hide();

    if (data.Content) {

        responseContainer.append($(parseTemplate(data.Content, data)));
    }

    if (data.Status === 3 && Array.isArray(data.PromissoryNotes) && data.PromissoryNotes.length) {

        beginSigning(data);
    }
}

function beginSigning(data: any) {

    const pNotes: IPromissoryNote[] = data.PromissoryNotes.map(getPromissoryNote);

    startSign(pNotes, { 
        completedCallback,
        signingContainerSelector: selectors.signingContainer
    });
}

function completedCallback(data: ISigningComplete): void {

    console.warn(data, "DATA");
}

const validatorList: { [key: string]: ControlCustomValidation } = {

    "mainApplicant.ssn": validateSsn,
    "coApplicant.ssn": validateSsn,
    "iban": validateIban,
    "mainApplicant.identificationDocumentNumber": validateIdNumber,
    "coApplicant.identificationDocumentNumber": validateIdNumber
};