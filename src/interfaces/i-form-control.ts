import { IDropDownProps } from "./i-dropdown-props";
import { IInputFormProps } from "./i-input-props";
import { IRadioButtonProps } from "./i-radio-button-props";
import { ICheckboxProps } from "./i-checkbox.props";
import { InputTypes } from "../types/input-types";
import { FormControlContainer } from "./i-form-state";
import { IControlConditionRule } from "./i-form-control-condition";
import { ControlCustomValidation } from "./i-control-validation-rule";
import { RefObject } from "react";
import { IFormControlSettings } from "./i-form-control-settings";
import { IValidationCode } from "./i-validation-code";
import { IFormSettings } from "./i-form-settings";

export type ControlPropsTypes = IDropDownProps | IInputFormProps | IRadioButtonProps | ICheckboxProps;

export interface IFormControl {
    controlName: string;
    type: InputTypes;
    value: any;
    isValid: boolean;
    label: string;
    required: boolean;
    controlContainer: FormControlContainer;
    elementRef: RefObject<any>;
    useDataListOptions?: boolean;
    formSettings: IFormSettings;
    placeholder?: string;
    validationMessage?: string;
    options?: string[] | Array<Record<string, any>>;
    dictionary?: string;

    readonly?: boolean;
    visible?: boolean;
    disabled?: boolean;
    description?: string;
    customValidation?: ControlCustomValidation;
    condition?: IControlConditionRule[];
    multiple?: boolean;
    allowedFileTypes?: string;
    buttonText?: string;
    requiredMessage?: string;
    fileExtensionMessage?: string;
    serviceName?: string;
    mapper?: string[];
    fullSize?: boolean;
    controls?: IFormControlSettings<any>[];
    controlArray?: Array<IFormControl[]>;
    numberRangeSettings?: string;
    maxItems?: number;
    minItems?: number;
    documentType?: string;
    /**
     * @description the property name which will be the parent name of the control when the form is submitted
     */
    blockName?: string;
    validations?: IValidationCode[];
    minDate?: string;
    maxDate?: string;

    keys?: string;
    addControls(count?: number): void;
    removeControl(index: number): void;
    setValue?(value: any, validate?: boolean): void;
    validate?(): boolean;
    onClickHandler?<T>(e: React.MouseEvent<T>, controlName: string, objectValue?: any): void;
    onChangeHandler?(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, controlName: string, objectValue?: any): void;
    onControlValueChangeHandler?(e: React.SyntheticEvent, controlName: string, objectValue?: any, otherValues?: any): void

}
