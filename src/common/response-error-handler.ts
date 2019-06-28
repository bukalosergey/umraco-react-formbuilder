import { IValidationError } from "../interfaces/i-responses";
import { IFormState } from "../interfaces/i-form-state";
import { IFormError } from "../interfaces/i-error-props";
import { validationCodes } from "./constants";

export function defaultValidationErrorHandler(response: IValidationError, context: any) {

	const fields: { controlName: string, code: string }[] = response.invalidFields;

	context.setState((state: IFormState) => {
		const errors: IFormError[] = [];
		fields.forEach((field) => {

            const { controlName, code } = field;
            const control = state.controls[controlName];

			if (control) {

                control.isValid = false;
                const codeItem = Array.isArray(control.validations) && control.validations.find(c => c.code === code);
                const messageText = codeItem 
                    ? codeItem.message 
                    : (code === validationCodes.required && control.formSettings.requiredMessage 
                        ? control.formSettings.requiredMessage 
                        : code
                    );
                    
                control.validationMessage = messageText;

				errors.push({
					controlName,
					message: `${control.label} - ${messageText}`
                });
                
			} else {

				errors.push({
					controlName,
					message: `${controlName} - is missing`
				});;
			}
		})

		return {
			controls: state.controls,
			errors
		};
	})
}
