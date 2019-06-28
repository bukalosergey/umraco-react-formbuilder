import { IFormControl } from "./i-form-control";
import { IFormSettings } from "./i-form-settings";
import { IFormError } from "./i-error-props";

export interface IFormState {
    controls: FormControlContainer;
    isValid: boolean;
    formSettings: IFormSettings;
    errors?: IFormError[];
}

export type FormControlContainer = { [key: string]: IFormControl };