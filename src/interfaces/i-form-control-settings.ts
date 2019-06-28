import { IFormControl } from "./i-form-control";
import { InputTypes } from "../types/input-types";
import { IControlConditionRule } from "./i-form-control-condition";
import { ControlCustomValidation } from "./i-control-validation-rule";
import { IValidationCode } from "./i-validation-code";

export interface IFormControlSettings<T> extends React.InputHTMLAttributes<T> {
    controlName: string;
    type: InputTypes;
    formControl?: IFormControl;
    validationMessage?: string;
    description?: string;
    options?: Array<Record<string, any>>;
    condition?: IControlConditionRule;
    customValidation?: ControlCustomValidation;
    onChangeHandler?: any;
    onClickHandler?: any;
    useDataListOptions?: boolean;
    validationCodes?: IValidationCode[];
    controls?: IFormControlSettings<T>[];
}